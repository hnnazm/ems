const fs = require('fs')
const Task = require('../models/Task')

module.exports = {
    name: 'task',
    description: '(Add | Delete | List) task',
    usage: '[add/delete] <task>, list',
    args: true,
    guildOnly: true,
    tasks: JSON.parse(fs.readFileSync('tasks.json')),
    execute(message, args) {
        const subCommand = args.shift().toLowerCase()

        switch (subCommand) {
            case 'add':
                if (!args.length) {
                    message.channel.send('Please provide task');
                } else {
                    const task = new Task(message.author.username, args.join(' '))

                    this.tasks.push(task)
                    let data = JSON.stringify(this.tasks, null, 2);
                    fs.writeFile('tasks.json', data, (err) => {
                        if (err) throw err;
                        console.log('Data written to file');
                    });
                    message.channel.send('Task added to task list');
                }
                break

            case 'delete':
                if (!args.length) {
                    message.channel.send('Please provide task');
                } else {
                    let index = Number(args.join(''))
                    console.log(index)
                    if (index > 0 && index <= this.tasks.length) {
                        this.tasks.splice(--index, 1)
                        message.channel.send('Task deleted!')
                    } else {
                        message.channel.send('Task does not exist!')
                    }
                }
                break

            case 'list':
                if (!this.tasks.length) {
                    return message.channel.send('Task list is empty');
                } else {
                    for (let index = 0; index < this.tasks.length; index++) {
                        message.channel.send(`${index + 1}. ${this.tasks[index].content}`)
                    }
                    // return message.channel.send('Listing all the tasks')
                }
                break
            default:
                message.channel.send('Please use the correct command')
        }
    }
}
