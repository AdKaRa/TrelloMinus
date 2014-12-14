/**
 * Created by pharo on 2014-11-12.
 */

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    list: {
      model: 'list'
    },
    comments: {
      collection: 'comment',
      via: 'card'
    },
    deadline: {
      type: 'datetime'
    },
    priority: {
      type: 'string',
      enum: ['none','low','medium','high'],
      defaultsTo: 'none'
    },
    position: {
      type: 'integer'
    },
    labels: {
      type: 'array'
    }
  },

  afterCreate: function(newOne, cb) {
    Card.count({list:newOne.list}).exec(function(err,count){
      Card.update({id:newOne.id},{position:count-1}).exec(function(){});
      cb();
    });
  }
};
