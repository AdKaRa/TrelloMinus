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
    }
  }
};
