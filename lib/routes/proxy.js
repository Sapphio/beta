const FormData = require('form-data')
const fetch = require('node-fetch')
const asyncBusboy = require('async-busboy')

const snakeCase = require('snake-case')
const appendQuery = require('append-query')

module.exports = async ctx => {
  const { method, state, params, query, request } = ctx
  try {
    var token = ''
    if (state.user && state.user.token) {
      token = state.user.token
    }
    const resource = `/${params[0]}`
    const body = method.toLowerCase() === 'get'
      ? query
      : request.body
    const url = encodeURI(resource) + request.search
    const res = !ctx.is('multipart/form-data')
      ? await (async () => {
        let options = {
          method,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        if (method.toUpperCase() !== "GET" && Object.keys(body).length > 0) {
          options.body = JSON.stringify(body)
          options.headers["Content-Type"] = "application/json"
        }
        const uri = appendQuery(`http://api.sapphire.moe:7070${url}`, {}, {
          encodeComponents: false
        })
        const res = await fetch(uri, options)
          .then(function(response) {
            return response.json()
          })
        return res
      })()
      // dirty hack for form-data
      : await (async () => {
        const { files: [file], fields } = await asyncBusboy(ctx.req)
        const body = createFileBody(file, fields)
        const res = await fetch(`http://api.sapphire.moe:7070${url}`, {
          method,
          body,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
        return res
      })()
    ctx.status = res.meta.code
    ctx.body = res
  } catch (e) {
    ctx.status = 401
    ctx.body = {
      meta: {
        code: ctx.status,
        message: 'You have to login.'
      }
    }
  }
}

function createFileBody(file, obj) {
  const fd = Object.keys(obj).reduce((fd, key) => {
    fd.append(key, obj[key])
    return fd
  }, new FormData())
  fd.append(file.fieldname, file)
  return fd
}
