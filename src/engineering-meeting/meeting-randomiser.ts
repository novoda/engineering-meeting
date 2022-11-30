import { toToastItem } from 'react-toastify/dist/utils';
import { delay, fetchWithTimeout } from './extensions';
import { allBlocks, BuildingBlock } from './models/building-block';
import { Content } from './models/state';

export class MeetingRandomiser {
   private blockRandomiser: BlockRandomiser
   private nameRandomiser: NameRandomiser

   static create() {
      return new MeetingRandomiser(
         new BlockRandomiser(),
         new NameRandomiser()
      )
   }

   constructor(blockRandomiser: BlockRandomiser, nameRandomiser: NameRandomiser) {
      this.blockRandomiser = blockRandomiser
      this.nameRandomiser = nameRandomiser
   }

   async randomise(): Promise<Content> {
      const title = this.nameRandomiser.createTitle()
      const blocks = this.blockRandomiser.randomise()
      const durationMin = blocks.reduce((acc, block) => acc + block.duration.minimum, 0)
      const durationMax = blocks.reduce((acc, block) => acc + block.duration.maximum, 0)
      const duration = `${durationMin} - ${durationMax} minutes`
      const generatedDate = getDateTime()
      try {
         const result = await fetchWithTimeout(
               `https://novoda-dreams.loca.lt/dreams?prompt="${this.nameRandomiser.generatePrompt(title)}}"`,

            {
               headers: { "Bypass-Tunnel-Reminder": "true" },
            },
            10_000
         );
         const blob = await result.blob();
         return new Content(blocks, title, duration, generatedDate, URL.createObjectURL(blob));
      } catch {
         await delay(2000)
         return new Content(blocks, title, duration, generatedDate);
      }
   }
}
class BlockRandomiser {
   randomise(): BuildingBlock[] {
      const blocks = allRequiredBlocks()

      let maxDuration = 0
      blocks.forEach((block) => {
         maxDuration += block.duration.maximum
      })

      const availableBlocks = allBlocks.filter(isNotRequiredBlock).shuffle()
      for (let i = 0; i < availableBlocks.length && (maxDuration <= 65 && blocks.length !== 4); i++) {
         const selectedBlock = availableBlocks[i]
         blocks.push(selectedBlock)
         maxDuration += selectedBlock.duration.maximum
      }
      return blocks.shuffle()
   }
}

function allRequiredBlocks() {
   return allBlocks.filter(isRequiredBlock)
}

function isRequiredBlock(block: BuildingBlock) {
   return (block.isRequired);
}

function isNotRequiredBlock(block: BuildingBlock) {
   return (!block.isRequired);
}

function getDateTime(): string {
   const date = new Date()
   return date.toLocaleString()
}

enum TimePeriod {
   Era,
   Century,
}

enum ContentType {
   Poster,
   Painting,
   DigitalArt,
} 

class NameRandomiser {

   private genre = ['Fantasy','Futuristic','Sci-fi','Dystopian','Horror','Western','Romance','Mystery','Animation','Crime','Adventure']
   private century = ['16th century','17th century','18th century','19th century','20th century','21st century','22nd century']
   private era = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s']

   private posterType = ['Movie Poster', 'Comic book front cover', 'Book front cover']
   private posterInspo = ['Game of Thrones','Star Wars','Star Trek','Lord of the Rings','The Simpsons','South Park','Family Guy','Futurama','American Dad','Rick and Morty','The Avengers']

   private paintingStyle = ['Surrealism','Cubism','Abstract','Minimalism','Renaissance','Hyperrealism','Iridescent']
   private paintingMethod = ['Oil','Watercolour','Acrylic','Digital','Graffiti']
   private paintingArtist = ['Banksy','John Berkey','Sandro Botticelli','Pablo Picasso','Vincent Van Gogh']

   private digitalStyle = ['Pop','Pixel','ASCII','Geometric','Low poly','Collage','Synthwave','Cyberpunk','Steampunk','Dystopia','Infinity','Isometric','Algorithmic']
   private digitalArtist = ['Syd Mead','Dan Mumford','Jacek Yerka','Stephan Martiniere','Simon Stalenhag']

   private nouns = ['Egg Salad', 'Ham Sandwich', 'Chicken McNugget', 'Club Turkey', 'Yellow Hat', 'Isolation', 'Wiggly Finger', 'Chi-Squared', 'Unicorn', 'Holographic', 'Extract',
      'Fish Guts', 'Bakersfield', 'Orange Juice', 'Scavenger', 'Colonization', 'Probabilistic', 'Gyroscopic', 'Cognition', 'Collaboration', 'Conjugate', 'Paradise', 'Comic Book',
      'Comic Book Store', 'Public Restroom', 'Onion', 'Boyfriend', 'Girlfriend', 'Happy Marriage', 'Roommate', 'Bacon', 'Pork Chop', 'Nerdvana', 'Planetary', 'Aquatic', 'Dumpster Dumpling',
      'Dumpling', 'Take Out', 'Badger', 'Cali', 'Awkward Angle', 'Smarties', 'Junk Food', 'French Fry', 'Animalcule', 'Cornfield', 'Train', 'Train Collector\'s', 'Pyramidal Train',
      'Christmas Tree', 'Self-Roast', 'Submarine', 'Navy Dolphin', 'Coiling Snake', 'Broken Record', 'Constellation', 'Star', 'Procrastination', 'Dancing',
      'Driving', 'Periodic', 'Newspaper', 'Jerusalem', 'Buddha', 'Complicated', 'Simplistic', 'Watermelon', 'Piñata', 'Party Pooper', 'Chess', '3D Chess', '4D Chess', 'Avocado', 'Pizza Man',
      'Pizza Woman', 'Pizza', 'Banana', 'Yellow Minion', 'Despicable Minion', 'Cabbage', 'Kale', 'Lettuce', 'Something', 'Dark Matter',
      'Anti-Matter', 'Toothpaste', 'Grasshopper', 'Ladybug', 'Mosquito', 'Quesadilla', 'Taco', 'Burrito', 'Bread Crumb', 'Pancake Stack', 'Whip Cream',
      'Christmas', 'Romance', 'Midnight', 'Monopolar', 'Troll', 'Hamburger', 'Spaghetti', 'Chicken Noodle Soup', 'Plankton', 'Ironic Ionic', 'Venus', 'Mars',
      'Date Night', 'Cooking Night', 'Game Night', 'Friendship', 'Status Quo', 'Bono', 'Raider\'s', 'Lewis\'s', 'Gru\'s', 'Moquito\'s', 'Persian Cat', 'Cat', 'Dog', 'Pug', 'Whale', 'Orange',
      'Ana\'s', 'Jozef\'s', 'Frank\'s', 'Diogo\'s', 'Michal\'s', 'Carl\'s', 'Pablo\'s', 'Mina\'s', 'Bartosz\'s', 'Juan\'s', 'Giuseppe\'s', 'Richard\'s', 'Ben\'s', 'Janusz\'s', 'Laith\'s', 'Baris\'s', 'Ken\'s', 'Lukasz\'s', 'Laurie\'s', 'Sarah\'s', 'Adam\'s', 'Ataul\'s', 'Paul\'s', 'Xavi\'s', 'Antonio\'s',
      'Soundcloud', 'Channel 4', 'Hopin', 'Glovo', 'Vodafone', 'Tesco', 'Huddle', 'All4', 'Tantalum', 'Charlotte & Tiltbury', 'Blu', 'Depict', 'Body Coach']
   private terms = ['Solution', 'Test', 'Integration Test', 'Unit Test', 'UI Test', 'Automated Test', 'Kubernetes Cluster',
      'Extension Function', 'Expansion', 'Factor', 'Transformation', 'Malfunction', 'Limit', 'Proximity Test', 'Minimization', 'Estimation', 'Optimization',
      'Permutation', 'Application', 'Synthesis', 'Path', 'Graph', 'Initiative', 'Effect', 'Problem', 'Instability', 'Stability Test', 'Number', 'Anomaly', 'Manipulation', 'Justification', 'Process',
      'Triangulation', 'Algorithm', 'Program', 'Side Effect', 'Decoupling', 'Paradigm', 'Correlation', 'Measurement', 'Alternative', 'Animation', 'Tensor', 'Dimension', 'Normalization',
      'Experiment', 'Migration', 'Fragmentation', 'Integration', 'Pull Request', 'Bug', 'Feature Request',
      'Github Issue', 'Rebase', 'Commit', 'Merge', 'Refactor', 'Monad', 'JIRA Ticket', 'Sprint', 'Retrospective', 'Ternary Operator', 'Switch', 'Sealed Class', 'Sealed Interface', 'Sealed Enum', 'Sealed Object',
      'Sealed Function', 'Sealed Method', 'Data Class', 'Interface', 'Enum', 'Object', 'Function', 'Method', 'Programming Language', 'Coroutine', 'Promise', 'Flow', 'Boolean', 'Integer', 'Double', 'String', 'JSON', 'XML', 'YAML',
      'Neural Network', 'For Loop', 'FlatMap', 'Script', 'Kata', 'Pair Programming Session', 'Arrow Function', 'Configuration File', 'Feature', 'Estimation', 'Spike', 'Memory Leak', 'Regular Expression', 'Arithmetic Operator',
      'Array', 'HashMap', 'List', 'Set', 'Bitwise Operator', 'Callback', 'Listener', 'Design Pattern', 'Source Code', 'Cocoa Pod', 'Software Component', 'Concurrency', 'Curly Bracket', 'Data Structure', 'Binary Tree',
      'Deprecated Variable', 'Deprecated Function', 'Deprecated Method', 'Deprecated Class', 'Deprecated Constant', 'Git Command', 'Loop', 'Expression', 'Library', 'Dependency', 'Stand Up', 'Private Property', 'Public Property',
      'Private Function', 'Public Function', 'Nested Class', 'Exception', 'Stack Trace', 'Syntax Error', 'Compiler Error', 'Runtime Error', 'Branch'
   ]
   private adjectives = ['Aquatic', 'Romantic', 'Funny', 'Futuristic', 'Big', 'Tiny', 'Small', 'Dummy', 'Fantastic', 'Complicated', 'Extraordinary', 'Toxic', 'Magnificient', 'Fantabulous', 'Weird', 'Expensive',
      'Perfect', 'Calm', 'Senseless', 'Paranormal', 'Incredible', 'Accurate', 'Ancient', 'New', 'Bright', 'Colorful', 'Cute', 'Deep', 'Dark', 'Elegant', 'Fancy', 'Huge', 'Impossible', 'Important']

   createTitle(): string {
      const adjective = this.random(this.adjectives)
      const noun = this.random(this.nouns)
      const term = this.random(this.terms)
      return `The ${adjective} ${noun} ${term}`
   }

   generatePrompt(title: string): string {
      let flavour = ""
      const typeIndex = this.randomIndex(ContentType)
      switch(ContentType[typeIndex]) {
         case "Poster": {
            flavour = this.createPoster()
            break;
         }
         case "Painting": {
            flavour = this.createPainting()
            break;
         }
         case "DigitalArt": {
            flavour = this.createDigitalArt()
            break;
         }
      }
        return title + ", " + this.pickTimePeriod() + ", " + this.random(this.genre) + ", " + flavour
   }

   createPoster(): string {
      const type = this.random(this.posterType)
      const inspo = this.random(this.posterInspo)

      return `${type} inspired by ${inspo}`
   }

   createPainting(): string {
      const style = this.random(this.paintingStyle)
      const method = this.random(this.paintingMethod)
      const artist = this.random(this.paintingArtist)

      return `${style} ${method} painting by ${artist}`
   }

   createDigitalArt(): string {
      const style = this.random(this.digitalStyle)
      const artist = this.random(this.digitalArtist)

      return `${style} digital illustration by ${artist}`
   }

   pickTimePeriod(): string {
      const typeIndex = this.randomIndex(TimePeriod)
      switch (TimePeriod[typeIndex]) {
         case "Era": {
            return this.random(this.era)
         }
         case "Century": {
            return this.random(this.century)
         }
         default: {
            throw ErrorEvent // TODO DEFINE ERROR
         }
      }
   }

   random(array: string[]): string {
      return array[Math.floor(Math.random() * array.length)]
   }

   randomIndex(list: object): number {
      return Math.floor(Math.random() * Object.keys(list).length / 2)
   }

   random2(list: object[]): object {
      const randomIndex = this.randomIndex(list)
      return list[randomIndex]
   }
}
