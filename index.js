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

const run = async () => {
    if (!process.argv[2]) {
        await figlet('dgen', async (err, res) => {
            if (err) return console.log(chalk.red('[ascii] could not print'))
            console.log(chalk.cyan(res));
        })

        setTimeout(async () => {
            await console.log(chalk.blue('Get started with Discord.js quickly!\n'))
            await require('fs').readdirSync(`${__dirname}/src/`).forEach(async command => {
                let cmdName = await command.replace('.js', '');
                let cmd = await require(`./src/${command}`)

                await console.log(chalk.magenta(`${cmdName} - ${cmd.info.desc}`))
            })
        }, 1500)
    } else {
        try {
            await require(`./src/${process.argv[2]}`).exec()
        } catch(e) {
            console.log(chalk.red('Unknown command! Check for any misspellings or typos?'))
        }
    }
}

run();