import jwt from "jsonwebtoken"

export const checkAuth = async (req, res, next) => {
  try{
    const token = req.cookies.token
    const result = jwt.verify(token, process.env.JWT_SECRET)

    req.user = result
    next()
  } catch (error) {
    res.status(401).send("Auth needed")
  }
}