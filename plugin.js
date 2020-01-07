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
	
	_getBeepSound(character, expression)
	{
		var Z = this.BEEPS[character];
		var sound = Z ? (Z[expression] ? Z[expression] : (Z['DEFAULT'] ? Z['DEFAULT'] : null)) : null;
		
		// Special Cases //
		if(sound === 'mettaton')
		{
			
		}
		else if(sound === 'temmie')
		{
			
		}
		else if(sound === 'gaster')
		{
			
		}
		
		return sound ? new ig.Sound(this.mod.baseDirectory.substring(7) + 'vc/' + sound + '.ogg') : null;
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
				this.parent();
			}
		});
		
		ig.MessageOverlayGui.Entry.inject({
			addMessage: function()
			{
				mod.beepSound.constructor === Array;
				this.beepSound = mod.beepSound ? mod.beepSound : this.beepSound;
				return this.parent(...arguments);
			}
		});
	}
}