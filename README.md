# bostich

Rush, push, cash.

## Google HashCode caching for JSON input.

Jolitron's parser is pretty awesome, but slow, so I created 
a wrapper to export the file in JSON format once it's parsed.

It takes an input file i.e. `kittens.in` and once it's parsed, saves a `kittens.json`
file right next to it, if does not exists. If it does, it tries to load that. 

Lightspeed.