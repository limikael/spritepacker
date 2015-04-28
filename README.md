Spritepacker
============
sp
Command line tool and grunt task to generate sprite sheets.

Command line tool
-----------------

Install with:

```
npm install -g spritepacker
```

Run with:

```
spritepacker my_file.png my_other_file.png
```

This will generate `spritesheet.json` and `spritesheet.png` in the current directory.

Grunt task
----------

This is not created yet!

Options
-------

These apply to both the command line tool and (eventually) to the grunt task:

* `--out=<prefix>`

  Use this to specify the name and directory of the generated spritesheet, rather than the default
  `spritesheet.json` and `spritesheet.png` in the current directory.

* `--series=<size>`

  By default, the size of the generated spritesheet will be adjusted automatically to accommodate for all 
  input files. If you use the `--series` option, then a series of spritesheets is generated instead. E.g.,
  if you specify `--series=512` then the generated images will be 512x512 pixels. They will be called
  `spritesheet0.json`, `spritesheet0.png`, `spritesheet1.json`, `spritesheet1.png`, and so on, and there will
  be as many images generated as required to accomodate for all input images. 

TODO
----

There are things to do! Feel free to pitch in! :)

* grunt task, as referenced above...
* import spritesheet
* ability to specify some sort of rules for mangling or prefixing the keys 
