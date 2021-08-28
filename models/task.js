function Task (user, content) {
  this.id = Math.random()
  this.created = {
    at: new Date().toLocaleDateString(),
    by: user
  }
  this.content = content
}

module.exports = Task
