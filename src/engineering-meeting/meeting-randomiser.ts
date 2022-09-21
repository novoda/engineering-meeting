import { fetchWithTimeout } from './extensions';
import { allBlocks, BuildingBlock } from './models/building-block';
import { Content } from './models/state';

const characteristics = ['Beautiful', 'Detailed', 'Fully transparent Background', 'Trending on artstation', 'Realistic', 'Movie Poster']

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
      const name = this.nameRandomiser.randomise()
      const blocks = this.blockRandomiser.randomise()
      const durationMin = blocks.reduce((acc, block) => acc + block.duration.minimum, 0)
      const durationMax = blocks.reduce((acc, block) => acc + block.duration.maximum, 0)
      const duration = `${durationMin} - ${durationMax} minutes`
      const generatedDate = getDateTime()
      try {
         const result_3 = await fetchWithTimeout(
            `https://novoda-dreams.loca.lt/dreams?prompt="${name}.${characteristics.join('.')}"`,
            {
               headers: { "Bypass-Tunnel-Reminder": "" },
            },
            10_000
         );
         const blob = await result_3.blob();
         return new Content(blocks, name, duration, generatedDate, URL.createObjectURL(blob));
      } catch {
         return new Content(blocks, name, duration, generatedDate);
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

class NameRandomiser {
   private nouns = ['Russian Rocket', 'Egg Salad', 'Yale-鸭力', 'Ham Sandwich', 'Chicken McNugget', 'Club Turkey', 'Yellow Hat', 'Isolation', 'Wiggly Finger', 'Chi-Squared', 'Unicorn', 'Holographic', 'Extract',
      'Fish Guts', 'Bakersfield', 'Orange Juice', 'Scavenger', 'Colonization', 'Probabilistic', 'Gyroscopic', 'Cognition', 'Collaboration', 'Geology', 'Conjugate', 'Paradise', 'Comic Book',
      'Comic Book Store', 'Public Restroom', 'Onion', 'Boyfriend', 'Girlfriend', 'Happy Marriage', 'Roommate', 'Hello', 'Bacon', 'Pork Chop', 'Nerdvana', 'Planetary', 'Aquatic', 'Dumpster Dumpling',
      'Dumpling', 'Take Out', 'Badger', 'Cali', 'Awkward Angle', 'Baby', 'Smarties', 'Junk Food', 'French Fry', 'Animalcule', 'Molecule', 'Cornfield', 'Train', 'Train Collector\'s', 'Pyramidal Train',
      'Christmas Tree', 'One Jiao', 'Self-Roast', 'Submarine', 'Navy Dolphin', 'Coiling Snake', 'Broken Record', 'Constellation', 'Star', 'Terminator', 'Procrastination', 'Dancing',
      'Driving', 'Periodic', 'Newspaper', 'Jerusalem', 'Buddha', 'Complicated', 'Simplistic', 'Watermelon', 'Piñata', 'Party Pooper', 'Chess', '3D Chess', '4D Chess', 'Avocado', 'Pizza Man',
      'Pizza Woman', 'Pizza', 'Banana', 'Yellow Minion', 'Despicable Minion', '4th Grade', '5th Grade', '13th Grade', 'Undergraduate', 'Cabbage, Kale, Lettuce', 'Something', 'Dark Matter', 'World War 0',
      'Anti-Matter', 'Electron', 'Proton', 'Muon', 'Ion', 'Isotope', 'Radioactivity', 'Toothpaste', 'Grasshopper', 'Ladybug', 'Mosquito', 'Quesadilla', 'Taco', 'Burrito', 'Bread Crumb', 'Pancake Stack', 'Whip Cream',
      'Christmas', 'Ionic', 'Ionic Compound', 'Covalent', 'Covalent Compound', 'Romance', 'Midnight', 'Monopolar', 'Troll', 'Hamburger', 'Spaghetti', 'Chicken Noodle Soup', 'Plankton', 'Ironic Ionic', 'Venus', 'Mars',
      'Date Night', 'Cooking Night', 'Game Night', 'Friendship', 'Fiendship', 'Status Quo', 'Bono', 'Raider\'s', 'Hawking', 'Spock', 'Euclid', 'Gauss', 'Eisenstein', 'Einstein', 'Feynmann', 'Lewis', 'Gru',
      'Ana', 'Jozef', 'Frank', 'Diogo', 'Michal', 'Carl', 'Pablo', 'Juan', 'Giuseppe', 'Richard', 'Ben', 'Januz', 'Laith', 'Baris', 'Ken', 'Lukasz', 'Laurie', 'Adam', 'Ataul', 'Paul', 'Xavi', 'Antonio',
      'Soundcloud', 'Channel 4', 'Hopin', 'Glovo', 'Vodafone', 'Tesco', 'Huddle', 'All4', 'Tantalum', 'Charlotte & Tiltbury', 'Blu', 'Depict', 'Body Coach']
   private terms = ['Initiation', 'Equivalency', 'Equivalence Relation', 'Equivalence Solution', 'Solution', 'Test', 'Integration Test', 'Unit Test', 'UI Test', 'Automated Test', 'Maneuver', 'Acquisition', 'Formulation',
      'Extension Function', 'Expansion', 'Factor', 'Transformation', 'Malfunction', 'Coefficient', 'Convergence', 'Divergence', 'Limit', 'Proximity Test', 'Minimization', 'Insufficiency', 'Estimation', 'Optimization',
      'Permutation', 'Application', 'Synthesis', 'Path', 'Graph', 'Initiative', 'Effect', 'Problem', 'Instability', 'Stability Test', 'Paradox', 'Number', 'Anomaly', 'Quirk', 'Manipulation', 'Justification', 'Process',
      'Triangulation', 'Algorithm', 'Program', 'Side Effect', 'Fallacy', 'Decoupling', 'Paradigm', 'Correlation', 'Measurement', 'Alternative', 'Simplex', 'Animation', 'Tensor', 'Dimension', 'Normalization', 'Renormalization',
      'Experiment', 'Migration', 'Fragmentation', 'Deficiency', 'Displacement', 'Contamination', 'Isotope', 'Dissipation', 'Integration', 'Diversion', 'Approximation', 'Catalyst', 'Pull Request', 'Bug', 'Feature Request',
      'Github Issue', 'Rebase', 'Bisection', 'Commit', 'Merge', 'Refactor', 'Monad', 'JIRA Ticket', 'Sprint', 'Retrospective', 'Ternary Operator', 'Switch', 'Sealed Class', 'Sealed Interface', 'Sealed Enum', 'Sealed Object',
      'Sealed Function', 'Sealed Method', 'Data Class', 'Interface', 'Enum', 'Object', 'Function', 'Method', 'Programming Language', 'Coroutine', 'Promise', 'Flow', 'Boolean', 'Integer', 'Double', 'String', 'JSON', 'XML', 'YAML',
      'Neural Network', 'For Loop', 'FlatMap', 'Script', 'Kata', 'Pair Programming Session', 'Arrow Function', 'Configuration File', 'Feature', 'Estimation', 'Spike', 'Memory Leak', 'Regular Expression', 'Arithmetic Operator',
      'Array', 'HashMap', 'List', 'Set', 'Bitwise Operator', 'Callback', 'Listener', 'Design Pattern', 'Source Code', 'Cocoa Pod', 'Software Component', 'Concurrency', 'Curly Bracket', 'Data Structure', 'Binary Tree',
      'Deprecated Variable', 'Deprecated Function', 'Deprecated Method', 'Deprecated Class', 'Deprecated Constant', 'Git Command', 'Loop', 'Expression', 'Library', 'Dependency', 'Stand Up', 'Private Property', 'Public Property',
      'Private Function', 'Public Function', 'Nested Class', 'Exception', 'Stack Trace', 'Syntax Error', 'Compiler Error', 'Runtime Error', 'Branch'
   ]
   private adjectives = ['Aquatic', 'Romantic', 'Funny', 'Futuristic', 'Big', 'Tiny', 'Small', 'Dummy', 'Fantastic', 'Complicated', 'Extraordinary', 'Toxic', 'Magnificient', 'Fantabulous', 'Weird', 'Expensive',
      'Perfect', 'Calm', 'Senseless', 'Paranormal', 'Incredible', 'Accurate', 'Aggresive', 'Ancient', 'New', 'Bright', 'Colorful', 'Cute', 'Deep', 'Dark', 'Elegant', 'Fancy', 'Huge', 'Impossible', 'Important']

   randomise(): string {
      const adjective = Math.random() > 0.5 ? this.adjectives[Math.floor(Math.random() * this.adjectives.length)] : ''
      const noun = this.nouns[Math.floor(Math.random() * this.nouns.length)]
      const term = this.terms[Math.floor(Math.random() * this.terms.length)]

      return `The ${adjective} ${noun} ${term}`
   }
}
