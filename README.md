# Simple Database

## Set up
Run in the console:
``` 
$ npm install
```

## Adding records
Records can be added as an array of objects.  The proprties ```database: ``` and ```collection: ``` are reserved words
and designate to which database or collection your record belongs. An unique ```_id: ``` property is generated for all
new records.

A record example:
```
{database: 'students', collection: 'english', name: 'steve', grade: 'B'}
```

