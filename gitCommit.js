// Executes arguments on commandline/powershell
const { exec } = require("child_process");
let args = process.argv;
// Remove first two command line arguments ("node gitCommit.js")
args.splice(0, 2);
let str = args.join(" "); // Git commit message

console.log(str);
exec("git add . ", cbadd);

// cbadd, cbcommit - callback functions
function cbadd(err, stdout, stderr) {
  if (err) {
    console.log(err);
    return;
  }

  exec(`git commit -m "${str}"`, cbcommit);
}

function cbcommit(err, stdout, stderr) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Commit successful!");
}
