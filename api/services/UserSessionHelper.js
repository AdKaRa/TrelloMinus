/**
 * UserSessionHelper
 *
 * @description :: Bunch of function to clarify the code and just help
 *
 */

module.exports = {

    isUserAuthenticated : function(req) {
        console.log(req.session.authenticated);
        return !!(req.session.user);
    },

    getUserProfilePath : function(req) {
        return '/profile/'+req.session.user.name;
    }
};