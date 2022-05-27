import { allBlocks, BuildingBlock } from './building-block';

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

   randomise(): { name: string, blocks: BuildingBlock[], duration: string } {
      const name = this.nameRandomiser.randomise()
      const blocks = this.blockRandomiser.randomise()
      const durationMin = blocks.reduce((acc, block) => acc + block.duration.minimum, 0)
      const durationMax = blocks.reduce((acc, block) => acc + block.duration.maximum, 0)
      const duration = `${durationMin} - ${durationMax} minutes`
      return { name, blocks, duration }
   }
}
class BlockRandomiser {
   randomise(): BuildingBlock[] {
      const availableBlocks = allBlocks.filter((block) => block.id !== undefined).shuffle()
      const blocks = []
      let maxDuration = 0
      for (let i = 0; i < availableBlocks.length && (maxDuration <= 70); i++) {
         blocks.push(availableBlocks[i])
         maxDuration += availableBlocks[i].duration.maximum
      }
      return blocks
   }
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
   private terms = ['Initiation', 'Equivalency', 'Equivalence Relation', 'Equivalence Solution', 'Solution', 'Test', 'Maneuver', 'Acquisition', 'Formulation', 'Contraction', 'Expansion', 'Factor', 'Reccurence',
      'Diffusion', 'Disintegration', 'Transformation', 'Vortex', 'Malfunction', 'Coefficient', 'Convergence', 'Divergence', 'Limit', 'Excitation', 'Acceleration', 'Attraction', 'Repulsion', 'Pulse', 'Proximity Test',
      'Resonance', 'Minimization', 'Insufficiency', 'Thermalization', 'Detoriation', 'Transmission', 'Incursion', 'Combustion', 'Estimation', 'Optimization', 'Sublimation', 'Reverberation', 'Permutation', 'Materialization',
      'Submergence', 'Exfoliation', 'Oscillation', 'Fluctuation', 'Application', 'Synthesis', 'Hysteresis', 'Path', 'Graph', 'Summation', 'Deviation', 'Automation', 'Evaporation', 'Condensation', 'Asymmetry', 'Conundrum',
      'Agitation', 'Regulation', 'Dissonance', 'Harmony', 'Initiative', 'Effect', 'Problem', 'Instability', 'Stability Test', 'Vaporization', 'Paradox', 'Number', 'Annhilation', 'Anomaly', 'Quirk',
      'Manipulation', 'Justification', 'Process', 'Recoil', 'Triangulation', 'Algorithm', 'Program', 'Reaction', 'Lemma', 'Postulate', 'Theorem', 'Homomorphism', 'Infatuation', 'Extravaganza', 'Journey',
      'Fallacy', 'Decoupling', 'Polarization', 'Paradigm', 'Correlation', 'Measurement', 'Alternative', 'Simplex', 'Manifold', 'Curvature', 'Tensor', 'Dimension', 'Normalization', 'Renormalization',
      'Extrapolation', 'Decay', 'Experiment', 'Explosion', 'Inflammation', 'Incubation', 'Ingestion', 'Agitation', 'Derivation', 'Interuption', 'Freezing Point', 'Boiling Point', 'Gestation', 'Migration',
      'Fragmentation', 'Conjecture', 'Reflection', 'Recalibration', 'Expedition', 'Emanation', 'Incursion', 'Hypothesis', 'Corollary', 'Transaction', 'Entanglement', 'Saturation', 'Deficiency', 'Displacement',
      'Contamination', 'Isotope', 'Dissipation', 'Integration', 'Diversion', 'Approximation', 'Catalyst', 'Pull Request', 'Bug', 'Feature Request', 'Github Issue', 'Rebase', 'Bisection', 'Commit', 'Merge']
   private adjectives = ['Aquatic', 'Romantic', 'Funny', 'Futuristic', 'Big', 'Tiny', 'Small', 'Dummy', 'Fantastic', 'Complicated', 'Extraordinary', 'Toxic', 'Magnificient', 'Fantabulous', 'Weird', 'Expensive',
      'Perfect', 'Calm', 'Senseless', 'Paranormal', 'Incredible', 'Accurate', 'Aggresive', 'Ancient', 'New', 'Bright', 'Colorful', 'Cute', 'Deep', 'Dark', 'Elegant', 'Fancy', 'Huge', 'Impossible', 'Important']

   randomise(): string {
      const adjective = Math.random() > 0.5 ? this.adjectives[Math.floor(Math.random() * this.adjectives.length)] : ''
      const noun = this.nouns[Math.floor(Math.random() * this.nouns.length)]
      const term = this.terms[Math.floor(Math.random() * this.terms.length)]

      return `The ${adjective} ${noun} ${term}`
   }
}
