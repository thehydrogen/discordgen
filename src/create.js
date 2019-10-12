#!/usr/bin/env node

/*
	-= discordgen =-
	Get started with
	Discord.js quickly!

	A open-source project
	by @kenhydrogen.
*/

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');

module.exports = {
	info: {
		desc: 'Create a new bot'
	},
	exec: () => {
		const askQuestions = () => {
			const questions = [
				{
					name: "NAME",
					type: "input",
					message: "What is the name of your new bot?"
				},
				{
					type: "list",
					name: "TYPE",
					message: "What type of bot are you making?",
					choices: ['moderation', 'fun', 'other'],
					filter: val => {
						return val.split(".")[1];
					}
				}
			];
		
			return inquirer.prompt(questions);
		};  
		
		const run = async () => {
			await figlet('dgen', async (err, res) => {
				if (err) return console.log(chalk.red('[ascii] could not print'))
				console.log(chalk.cyan(res));
			})
		
			setTimeout(async () => {
				let answers = await askQuestions();
				const { NAME, TYPE } = answers;
		
				console.log(chalk.blue('\n[setup] Alright! I\'m setting up your bot for you.'))
				console.log(chalk.yellow('[git] If you don\'t have Git installed, this process will fail.'))
		
				require('child_process').exec(`git clone -b t-${TYPE} https://github.com/thehydrogen/discordgen.git `, async (err, stdout, stderr) => {
					if (err) {
						console.log(chalk.red(`[setup] Downloading files failed, are you sure Git is installed?`))
						return console.log(chalk.red(`Stderr: ${stderr}`))
					}
					await console.log(chalk.green('It seems like things have worked out! Now run "discordgen configure" to configure your bot!'))
				})
			}, 1500)
		}
		
		run();
	}
};