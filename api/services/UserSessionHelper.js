/**
 * UserSessionHelper
 *
 * @description :: Bunch of function to clarify the code and just help
 *
 */

module.exports = {
    //TODO: make appropriate policy for that
    isUserAuthenticated : function(req) {
        return !!(req.session.user);
    },

    getUserProfilePath : function(req) {
        return '/user/'+req.session.user.name;
    }
};
