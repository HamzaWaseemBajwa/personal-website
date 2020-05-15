module.exports = {
  apps : [
	{
		name:	"front-end",
		script:	"npm",
		args:	"start",
		cwd:	"./client"
	},
	{
		name:	"back-end",
		script:	"nodemon",
		args:	"server",
		cwd:	"./backend"
	}
	
  ]
};
