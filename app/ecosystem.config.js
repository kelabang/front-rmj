module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // Second application
    {
     	name      : 'rumaji alpha web',
      	script : 'npm',
	args : 'run serve'
    }
  ],
};
