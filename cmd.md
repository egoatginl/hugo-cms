# CMD 

## node
brew install nvm

~/.profile or ~/.zshrc:
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion


nvm list
nvm ls-remote --lts
nvm install --lts
nvm use node 

node v24.13.1


## install 
cd /Users/lge11/GithubP/hugo-cms && npm install



## Git cleanup

git reset --soft $(git rev-list --max-parents=0 HEAD) - Moves the branch pointer back to the very first commit while keeping all changes staged
git commit -m "Initial commit" - Creates a new single commit with all changes
git push --force origin main - Force pushes to overwrite remote history

orphan branch approach
git checkout --orphan new-branch - Creates a new branch with no history
git add -A - Stages all current files
git commit -m "Initial commit" - Creates the first commit on the new branch
git branch -D main - Deletes the old main branch locally
git branch -m main - Renames new-branch to main
git push -f origin main - Force pushes the new history to remote

## git multiple accounts 
github desktop 1 ent 1 person 

git remote set-url origin https://egoatginl@github.com/egoatginl/hugo-cms.git
git remote -v

### HTTPS 
use Fine-grained Personal Access Token
  Contents set to Read and write to push changes to the repository's code and files.
  Metadata set to Read-only (this is often a default).
  Depending on specific needs, other permissions may be required, such as:
  Pull requests (Read and write)
  Issues (Read and write)
  Workflows (Write) if pushing changes to files in the .github/workflows directory.
when push will ask for username and pw, but osx use keychain so will store for all github.com
change remote so that each folder/user gets different creds 
git remote -v
git remote set-url origin https://username@github.com/org/repo.git 
use PAT as password 
clear old ones 
git credential-osxkeychain erase

### SSH Each repo can use a different SSH key.
create key (ed25519)
ssh-keygen -t ed25519 -C "you@example.com" -f ~/.ssh/id_ed25519
start agent (if not running)
eval "$(ssh-agent -s)"

macOS: add to keychain (recommended)
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
or
ssh-add -K ~/.ssh/id_ed25519

Create ~/.ssh/config
# ~/.ssh/config
Host github-work
HostName github.com
User git
IdentityFile ~/.ssh/id_ed25519_work

Host github-personal
HostName github.com
User git
IdentityFile ~/.ssh/id_ed25519_personal

With this, remotes will use github-work or github-personal instead of github.com.
git remote set-url origin git@github.com:OWNER/REPO.git
if you used ~/.ssh/config Host alias (multi-account)
git remote set-url origin git@github-work:OWNER/REPO.git
git remote -v

test
ssh -T git@github.com
# or, if using alias:
ssh -T git@github-work