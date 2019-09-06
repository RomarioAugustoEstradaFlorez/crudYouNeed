/** Autor - Romario Estrada **/
'use strict';
module.exports = function(Attachment){
    Attachment.observe('after save', function(ctx, next) {
        next();
    });
};