# Heralds of Ruin - Roster viewer and Pdf Generator

## Usage

https://labernator.github.io/HoRConfigurator/

Enjoy :)

## Working with the configuration files

Choose one of the current rosters to view and download or upload your own roster.
If you want to upload your own roster, you need to create a JSON file that sticks to the warband interface.

You can find the warband interface definition here:
[Types definition](https://github.com/Labernator/HeraldsOfRuinCoopCampaigns/blob/master/hor-configurator/src/types.ts)

You can find the sample warband JSON files here:
[Folder with warband JSONs](https://github.com/Labernator/HeraldsOfRuinCoopCampaigns/tree/master/hor-configurator/src/data/samples)

If you want to use other/new units you might need to add new weapons/rules etc. to the respective jsons. I will add stuff there over time.

## Configuration examples 

### Mandatory top-level properties
**Title - string**
*The name you give your warband*
> "Title": "The Emperors Faithful"

**Faction - FactionEnum**
*The faction your warband is from* see [Types definition](https://github.com/Labernator/HeraldsOfRuinCoopCampaigns/blob/master/hor-configurator/src/types.ts) for FactionEnum stating which ones are supported
> "Faction": "Adepta Sororitas"

**Philosophy - string**
*The philosophy you chose for your warband*
> "Philosophy": "World on Fire"

### Optional top-level properties
**Alignment - string**
*Some warbands have choices that you can make, choosing a SEPT, CHAPTER, ORDER, etc.*
> "Alignment": "Order of the Valorous Heart"

**ScenariosPlayed - number**
*If your warband is playing in a campaign, enter the number of games already played here to get the right amount of TP*
> "ScenariosPlayed": 0

### Army Roster - Array<RosterModel| string>**
*An array of strings or complex types* see [Types definition](https://github.com/Labernator/HeraldsOfRuinCoopCampaigns/blob/master/hor-configurator/src/types.ts)

#### Describing a Model/Unit - The Properties
**Either describe a model by just adding a string with its name. This will lead to the default configuration. Or use an object with these Properties:**

**Name - string**
*The minimum property that needs to be stated is the name property. If only the name is given, the default configuration of that unit will be used (analogue to just giving a string not an object)*

> { "name": "Eliminator" }

*All other properties can be used to manipulate the default*

**Amount - number**
*More or less self-explanatory. This property states how many of this model you bought. Default if omitted is 1.*
> { "name": "Hellblaster", "amount": 2 }

**Type - string**
*With this you can override the type of the model. E.g. if your opus allows you to take a unit as Core that is normally Special.*
> { "name": "Aggressor", "type": "Core }

**Stats - Modelstats | Modelstats[]**
*With this you can override one or up to all stats a model has. Useful e.g. if you buy a Jump Pack or such.*
> { 
    "name": "Canoness Regular", 
    "type": "Core,
    "stats": { "Movement": 12 } 
  }

**Keywords - string[]**
*Some units can gain Keywords by buying rules or equipment. With this property you can add Keywords.*
> { 
    "name": "Canoness Regular", 
    "keywords": ["Jump Pack", "Fly"]
  }
  
**Rules - string[]**
*Some units can gain Rules by buying them. With this property you can add Rules to the set of default rules.*
> { 
    "name": "Hellblaster Sergeant",
    "rules": ["Rites of War"]
  }