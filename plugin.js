export default class UndertaleSFX extends Plugin
{
	/*
	[Field Variables]
	- BEEPS (Object): Determine the beep sound to use based on the character and their expression. Expression overrides Character.
	- beepSound (Object): The ig.Sound object used for the beep.
	This code is super ghetto compared to the Voice Mod. Refer to that and the comments there.
	*/
	
	constructor(mod)
	{
		super(mod);
		this.mod = mod;
	}
	
	async preload() {}
	async postload() {}
	async prestart() {}
	
	async main()
	{
		this.BEEPS = await simplify.resources.loadJSON(this.mod.baseDirectory.substring(7) + 'vc/config.json');
		this._inject(this);
	}
	
	_inject(mod)
	{
		ig.EVENT_STEP.SHOW_MSG.inject({
			beepSound: null,
			init: function()
			{
				this.parent(...arguments);
				this.beepSound = mod._getBeepSound(this.person, this.charExpression.expression);
			},
			start: function()
			{
				mod.beepSound = this.beepSound;
				this.parent(...arguments);
			}
		});
		
		ig.MessageOverlayGui.Entry.inject({
			addMessage: function()
			{
				if(mod.beepSound && mod.beepSound.constructor !== Array)
					this.beepSound = mod.beepSound || this.beepSound;
				return this.parent(...arguments);
			}
		});
		
		sc.TextGui.inject({
			update: function()
			{
				if(mod.beepSound && mod.beepSound.constructor === Array)
					this.beepSound = mod.beepSound[mod._getRandom(0, mod.beepSound.length)];
				this.parent(...arguments);
			}
		});
	}
	
	_getBeepSound(character, expression)
	{
		var Z = this.BEEPS[character];
		var sound = Z ? (Z[expression] || Z['DEFAULT']) : null;
		var list;
		
		// Special Cases //
		if(sound === 'mettaton')
		{
			list = [];
			
			for(var i = 0; i < 9; i++)
				list[i] = new ig.Sound(this.mod.baseDirectory.substring(7) + 'vc/mettaton-' + (i+1) + '.ogg');
		}
		else if(sound === 'temmie')
		{
			list = [];
			
			for(var i = 0; i < 6; i++)
				list[i] = new ig.Sound(this.mod.baseDirectory.substring(7) + 'vc/mettaton-' + (i+1) + '.ogg');
		}
		else if(sound === 'gaster')
		{
			list = [];
			
			for(var i = 0; i < 7; i++)
				list[i] = new ig.Sound(this.mod.baseDirectory.substring(7) + 'vc/mettaton-' + (i+1) + '.ogg');
		}
		
		return list || (sound ? new ig.Sound(this.mod.baseDirectory.substring(7) + 'vc/' + sound + '.ogg') : null);
	}
	
	// If min = 1 & max = 10, generates 1-9.
	_getRandom(min, max) {return Math.floor(Math.random() * (max - min)) + min;}
}