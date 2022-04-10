/*
 * @Author: litfa
 * @Date: 2022-04-10 15:33:17
 * @LastEditTime: 2022-04-10 16:22:41
 * @LastEditors: litfa
 * @Description: 路由
 * @FilePath: /blog-service/src/router/admin/index.ts
 * 
 */
import config from './../../config'
import { Router } from 'express'
import query from './../../db/query'
const router = Router()

router.get('/', (req, res) => {
  res.send('Admin Status: Ok.')
})

// 用户权限验证
router.use('*', async (req, res, next) => {
  const user = req.user as any
  let err, results
  if (user.id != undefined) {
    [err, results] = await query('SELECT * FROM `users` WHERE id=?', user.id)
    if (err) res.send({ status: 5 })
    if (results.length != 1) return res.send({ status: 5 })
  }
  if (results[0].status != 1) {
    return res.send({ status: 3 })
  }
  if (results[0].permissions < 15) {
    return res.send({ status: 2 })
  }
  next()
})

export default router