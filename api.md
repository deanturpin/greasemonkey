Get last five commits for a repo
```
curl "https://api.github.com/repos/deanturpin/templates/commits?per_page=5"
```

Get five repos for user
```bash
curl --silent 'https://api.github.com/users/deanturpin/repos?per_page=5'  | grep full_name 
"full_name": "deanturpin/Bash",
"full_name": "deanturpin/Big-O-Notation",
"full_name": "deanturpin/BMI",
"full_name": "deanturpin/Colour-palettes",
"full_name": "deanturpin/config",
```

Get issues
```
https://api.github.com/repos/deanturpin/Bash/issues
```
