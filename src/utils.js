import simpleGit from "simple-git";

function capitalizeFirstLetter(string) {
  if (string.length === 0) {
    return string; // Return empty string if input is empty
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getCurrentGitBranch = () => {
  const git = simpleGit();
  return new Promise((resolve, reject) => {
    git.raw(["rev-parse", "--abbrev-ref", "HEAD"], (err, branch) => {
      if (err) {
        reject(err);
      }
      resolve(branch.trim());
    });
  });
};

export { capitalizeFirstLetter, getCurrentGitBranch };
