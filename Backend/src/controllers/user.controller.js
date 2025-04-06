import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
  
      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })
  
      return { accessToken, refreshToken }
  
  
    } catch (error) {
      throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
  }


  const registerUser = asyncHandler(async (req, res) => {
    // get user details from fronted
    // validation -- not empty
    // check if user already exists : username, email
    // create user object - create entry in db
    // remove password and refresh token field from  response
    // check for user creation 
    // return response
  
    const { fullname, email, username, password } = req.body
    // console.log("email: ", email);
  
    //    if(fullname === ""){
    //     throw new ApiError(400, "full name is required")
    //    }
  
    if (
      [fullname, email, username, password].some(field => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
  
    const existedUser = await User.findOne({
      $or: [{ username }, { email }]
    })
  
    if (existedUser) {
      throw new ApiError(409, "User with email or usename already exists")
    }
  
    // console.log(req.files)
  
    const user = await User.create({
      fullname,
      email,
      password,
      username: username.toLowerCase()
    })
  
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )
  
    if (!createdUser) {
      throw new ApiError(500, "something went wrong while registering the user")
    }
    return res.status(201).json(
      new ApiResponse(200, createdUser, "user registered successfully")
    )
  
  })  


  const loginUser = asyncHandler(async (req, res) => {
    //get data from req body
    //username or email
    //find the user
    //password check
    //access and refresh token
    //send cookie
  
    const { email, username, password } = req.body
  
    if (!(username || email)) {
      throw new ApiError(400, "username or email is required")
    }
  
    const user = await User.findOne({
      $or: [{ username }, { email }]
    })
  
    if (!user) {
      throw new ApiError(404, "user does not exist")
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password)
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Enter valid password")
    }
  
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
  
    const loggedInUser = await User.findById(user._id).select("-password  -refreshToken")
  
    const options = {
      httpOnly: true,
      secure: true
    }
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser, accessToken, refreshToken
          },
          "User logged In Successfully"
        )
      )
  
  
  
  })

  const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1 // this remove the field document
        }
      },
      {
        new: true
      }
    )
  
    const options = {
      httpOnly: true,
      secure: true
    }
  
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out"))
  })
  
  
  const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  
    if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
    }
  
    try {
      const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
  
      const user = await User.findById(decodedToken?._id)
  
      if (!user) {
        throw new ApiError(401, "invalid Refresh Token")
      }
  
      if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh Token is expired")
      }
  
      const options = {
        httpOnly: true,
        secure: true
      }
  
      const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
  
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(200, { accessToken, newRefreshToken }, "Access token refreshed succussfully"))
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
    }
  
  })
   
  export { registerUser, loginUser, logoutUser, refreshAccessToken }

