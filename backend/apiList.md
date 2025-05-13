authRouter
-POST /signup
-POST /signin
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

connectionRequestRouter
-POST /request/send/interested/:userID
-POST /request/send/ignore/:userID
-POST /request/review/accept/:userID
-POST /request/review/reject/:userID

userRouter
-GET /user/connections
-GET /user/requests
-GET /user/feed
