import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';


// Start the server
const port = Number(process.env.PORT || 3000);

// this is default in case of unmatched routes
app.use(function(req, res) {
    // Invalid request
          res.json({
            error: {
              'name':'Error',
              'status':404,
              'message':'Invalid Request',
              'statusCode':404,
              'stack':'http://localhost:3000/api/products'
            },
             message: 'Invalid Routing!'
          });
    });

app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
