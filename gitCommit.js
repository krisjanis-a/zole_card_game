const { exec } = require("child_process");
let args = process.argv;
args.splice(0, 2);
let str = args.join(" ");

console.log(str);
exec("git add . ", cbadd);

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
