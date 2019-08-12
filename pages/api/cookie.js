export default (req, res) => {
    console.log('Cookie endpoint hit!');
    //console.log(req.cookies);
    console.log('The session cookie on the server is: ', req.cookies.userSessionId);
    res.status(200).json({ cookie: req.cookies.userSessionId });
}
