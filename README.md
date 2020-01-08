# undertale-sfx
Replace the default text sound with ones from Undertale which depend on the character and their expression. Can be modified via `config.json`.

Sounds are from [here](https://www.sounds-resource.com/pc_computer/undertale/sound/6275/).

## Note
**I will not be working on this repo for a while. Consider this an abandoned cluster of undocumented spaghetti code that may or may not work.**

# config.json
```json
{
	"character":
	{
		"expression": "sound effect",
		"DEFAULT": "Doubles as the sound effect used when a character has a DEFAULT expression or
		whenever the character has an expression that isn't defined here (ie the default case)."
	}
}
```

# TODO List
- Add support for side messages.
- Add other voices which have multiple values like Mettaton.
- Add Undyne.