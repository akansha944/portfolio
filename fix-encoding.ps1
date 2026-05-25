# Fixes UTF-16 files (wrong encoding). Safe to run anytime.
$node = "${env:ProgramFiles}\nodejs\node.exe"
if (-not (Test-Path $node)) { Write-Host "Install Node.js first."; exit 1 }
$script = @"
const fs=require('fs');
const dir=process.argv[1];
function fix(p){const b=fs.readFileSync(p);if(b.length<2||b[1]!==0)return false;let s='';for(let i=0;i<b.length;i+=2)s+=String.fromCharCode(b[i]);fs.writeFileSync(p,s,'utf8');return true;}
fs.readdirSync(dir).forEach(f=>{const p=dir+'/'+f;if(!/\.(html|css|js)$/i.test(f))return;if(fix(p))console.log('Fixed:',f);else console.log('OK:',f);});
"@
$tmp = [System.IO.Path]::GetTempFileName() + ".js"
[System.IO.File]::WriteAllText($tmp, $script, (New-Object System.Text.UTF8Encoding $false))
& $node $tmp $PSScriptRoot
Remove-Item $tmp -Force