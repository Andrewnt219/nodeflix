module.exports = function(err,req,res,next) {
    if(req.body._method === 'PUT')
        req.method = 'PUT';
    if(req.body._method === 'DELETE')
        req.method = 'DELETE';
}