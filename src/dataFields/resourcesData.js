const ResourcesTitle = {
    STL : "C++ STL Handwritten Notes",
    SortingAlgorithms: 'Sorting Algorithms',
    SinglyLinkedList: 'Singly Linked List',
    GreedyApproach: 'Greedy Approach',
    HashMap: 'Hashmap/Map',
    OOPsNotes: 'OOPs Notes',
    BitManipulation: 'Bit Manipulation',
    DPPart1: 'Dynamic Programming (DP) Part-1',
    DPPart2: 'Dynamic Programming (DP) Part-2',
    OperatingSystemPart1: 'Operating System Part-1',
    OperatingSystemPart2: 'Operating System Part-2',
    ComputerNetworksNotes: 'Computer Networks Short Notes',
    CompilerDesignNotes: 'Compiler Design Notes',
    AlgorithmShortNotes: 'Algorithm Short Notes',
    OperatingSystemShortNotes: 'Operating System Short Notes',
    GraphPart1: 'Graph Part-1',
    GraphPart2: 'Graph Part-2',
    LambdaExpressionsJava: 'Lambda Expressions (Java)',
    JavaCollections: 'Java Collections',
    CP31 : "CP 31 Sheet",
    ACD : "ACD ladders",
    CSES : "CSES Problem Set",
    CPBOOK : "Competitive Programmer's Handbook",
  };

const  Creational = {
    SINGLETON: "Singleton Pattern",
    FACTORY_METHOD: "Factory Method Pattern",
    ABSTRACT_FACTORY: "Abstract Factory Pattern",
    BUILDER: "Builder Pattern",
    PROTOTYPE: "Prototype Pattern"
}

const Behavioral =  {
  CHAIN_OF_RESPONSIBILITY: "Chain of Responsibility Pattern",
  COMMAND: "Command Pattern",
  INTERPRETER: "Interpreter Pattern",
  ITERATOR: "Iterator Pattern",
  MEDIATOR: "Mediator Pattern",
  MEMENTO: "Memento Pattern",
  OBSERVER: "Observer Pattern",
  STATE: "State Pattern",
  STRATEGY: "Strategy Pattern",
  TEMPLATE_METHOD: "Template Method Pattern",
  VISITOR: "Visitor Pattern",

}

const Structural = {
  ADAPTER: "Adapter Pattern",
  BRIDGE: "Bridge Pattern",
  COMPOSITE: "Composite Pattern",
  DECORATOR: "Decorator Pattern",
  FACADE: "Facade Pattern",
  FLYWEIGHT: "Flyweight Pattern",
  PROXY: "Proxy Pattern"
}

  
export const MyHandWrittenNotes = [
    { id: 1, title: ResourcesTitle.STL, link: "https://www.linkedin.com/posts/kapilyadav22_c-stl-notes-activity-6873598326260994048-B4Pb/" },
    { id: 2, title: ResourcesTitle.SortingAlgorithms, link: 'https://lnkd.in/gJWWHX5m' },
    { id: 3, title: ResourcesTitle.SinglyLinkedList, link: 'https://lnkd.in/gNury6T9' },
    { id: 4, title: ResourcesTitle.GreedyApproach, link: 'https://lnkd.in/gsAvp5k7' },
    { id: 5, title: ResourcesTitle.HashMap, link: 'https://lnkd.in/g9EzR2V8' },
    { id: 6, title: ResourcesTitle.OOPsNotes, link: 'https://lnkd.in/gR2HJ8TB' },
    { id: 7, title: ResourcesTitle.BitManipulation, link: 'https://lnkd.in/gcpZeetG' },
    { id: 8, title: ResourcesTitle.DPPart1, link: 'https://lnkd.in/gq_Nw8S8' },
    { id: 9, title: ResourcesTitle.DPPart2, link: 'https://lnkd.in/gXT4aRtn' },
    { id: 10, title: ResourcesTitle.OperatingSystemPart1, link: 'https://lnkd.in/gDx2sTtY' },
    { id: 11, title: ResourcesTitle.OperatingSystemPart2, link: 'https://lnkd.in/gtVXFWEg' },
    { id: 12, title: ResourcesTitle.ComputerNetworksNotes, link: 'https://lnkd.in/gdrA476E' },
    { id: 13, title: ResourcesTitle.CompilerDesignNotes, link: 'https://lnkd.in/gsy9CxQb' },
    { id: 14, title: ResourcesTitle.AlgorithmShortNotes, link: 'https://lnkd.in/gQNumHam' },
    { id: 15, title: ResourcesTitle.OperatingSystemShortNotes, link: 'https://lnkd.in/gycDD_tS' },
    { id: 16, title: ResourcesTitle.GraphPart1, link: 'https://lnkd.in/gFdD8hwH' },
    { id: 17, title: ResourcesTitle.GraphPart2, link: 'https://lnkd.in/gB5MYEzQ' },
    { id: 18, title: ResourcesTitle.LambdaExpressionsJava, link: 'https://lnkd.in/gqx5JY3F' },
    { id: 19, title: ResourcesTitle.JavaCollections, link: 'https://lnkd.in/gbyeptgB' },
  ];

  export const CompetitiveProgramming = [
    { id: 1, title: ResourcesTitle.CP31, image: "", link: 'https://www.tle-eliminators.com/cp-sheet' },
    { id: 2, title: ResourcesTitle.ACD, image: "", link: 'https://acodedaily.com/' },
    { id: 3, title: ResourcesTitle.CSES, image: "", link: 'https://cses.fi/problemset/' },
    { id: 4, title: ResourcesTitle.CPBOOK, image: "", link: 'https://github.com/pllk/cphb' },
    // { id: 1, title: ResourcesTitle.CP31, image: "", link:  ''},
  ]

  export const CreationalDesignPatterns = [
    { id: 1, title: Creational.SINGLETON, image: "", link: 'https://blog.algomaster.io/p/singleton-design-pattern' },
    { id: 2, title: Creational.FACTORY_METHOD, image: "", link: 'https://refactoring.guru/design-patterns/factory-method' },
    { id: 3, title: Creational.ABSTRACT_FACTORY, image: "", link: 'https://refactoring.guru/design-patterns/abstract-factory' },
    { id: 4, title: Creational.BUILDER, image: "", link: 'https://refactoring.guru/design-patterns/builder' },
    { id: 5, title: Creational.PROTOTYPE, image: "", link: 'https://refactoring.guru/design-patterns/prototype' },
]

   
export const StructuralDesignPatterns = [
  { id: 1, title: Structural.ADAPTER, image: "", link: 'https://refactoring.guru/design-patterns/adapter' },
  { id: 2, title: Structural.BRIDGE, image: "", link: 'https://refactoring.guru/design-patterns/bridge' },
  { id: 3, title: Structural.COMPOSITE, image: "", link: 'https://refactoring.guru/design-patterns/composite' },
  { id: 4, title: Structural.DECORATOR, image: "", link: 'https://refactoring.guru/design-patterns/decorator' },
  { id: 5, title: Structural.FACADE, image: "", link: 'https://refactoring.guru/design-patterns/facade' },
  { id: 6, title: Structural.FLYWEIGHT, image: "", link: 'https://refactoring.guru/design-patterns/flyweight' },
  { id: 7, title: Structural.PROXY, image: "", link: 'https://refactoring.guru/design-patterns/proxy' },
]

export const BehaviouralDesignPatterns = [
  { id: 1, title: Behavioral.CHAIN_OF_RESPONSIBILITY, image: "", link: 'https://refactoring.guru/design-patterns/chain-of-responsibility' },
  { id: 2, title: Behavioral.COMMAND, image: "", link: 'https://refactoring.guru/design-patterns/command' },
  // { id: 3, title: Behavioral.INTERPRETER, image: "", link: '' },
  { id: 4, title: Behavioral.ITERATOR, image: "", link: 'https://refactoring.guru/design-patterns/iterator' },
  { id: 5, title: Behavioral.MEDIATOR, image: "", link: 'https://refactoring.guru/design-patterns/mediator' },
  { id: 6, title: Behavioral.MEMENTO, image: "", link: 'https://refactoring.guru/design-patterns/memento' },
  { id: 7, title: Behavioral.OBSERVER, image: "", link: 'https://refactoring.guru/design-patterns/observer' },
  { id: 8, title: Behavioral.STATE, image: "", link: 'https://refactoring.guru/design-patterns/state' },
  { id: 9, title: Behavioral.STRATEGY, image: "", link: 'https://refactoring.guru/design-patterns/strategy' },
  { id: 10, title: Behavioral.TEMPLATE_METHOD, image: "", link: 'https://refactoring.guru/design-patterns/template-method' },
  { id: 11, title: Behavioral.VISITOR, image: "", link: 'https://refactoring.guru/design-patterns/visitor' },
]



// export const SystemDesign = [
//       { title: 'Creational Design Patterns', items: CreationalDesignPatterns},
//       { title: 'Structual Design Patterns', items: StructuralDesignPatterns}
// ]

export const SystemDesign = [
  { id: 1, title: "One Stop Solution For System Design By Shivam Bhadani", image: "", link: 'https://medium.com/@shivambhadani_/system-design-for-beginners-everything-you-need-in-one-article-c74eb702540b' },
]

// { id: 3, title: "", image: "", link: '' },

export const AWSSeries = [
  { id: 1, title: "Introduction to Cloud and EC2", image: "", link: 'https://medium.com/@shivambhadani_/aws-part-1-introduction-to-cloud-and-ec2-f06cdc80a1fc' },
  { id: 2, title: "A Beginner’s Guide to Understanding AWS EBS Volumes", image: "", link: 'https://medium.com/@shivambhadani_/aws-part-2-a-beginners-guide-to-understanding-aws-ebs-volumes-a6f87b1140c8' },
  { id: 3, title: "Horizontal Scaling and Load Balancer", image: "", link: 'https://medium.com/@shivambhadani_/aws-part-3-horizontal-scaling-and-load-balancer-223d005ef11e' },
  { id: 4, title: "Step-by-Step Guide to Create Your First AWS Auto Scaling Group", image: "", link: 'https://medium.com/@shivambhadani_/aws-part-4-step-by-step-guide-to-create-your-first-aws-auto-scaling-group-826c1effc0ec' },
  { id: 5, title: "Learn Complete AWS VPC in Just One Article", image: "", link: 'https://medium.com/@shivambhadani_/aws-part-5-learn-complete-aws-vpc-in-just-one-article-5ffe34888a5c' },
]

  export const resourcesData = [
    { title: 'My Handwritten Notes', items: MyHandWrittenNotes},
    { title: 'Competitive Programming', items : CompetitiveProgramming},
    { title: 'Creational Design Patterns', items: CreationalDesignPatterns},
    { title: 'Structual Design Patterns', items: StructuralDesignPatterns},
    {title: 'Behavioural Design Patterns', items: BehaviouralDesignPatterns},
    {title: 'Must Read Medium Articles', items: SystemDesign},
    {title: 'AWS Series By Shivam Bhadani', items: AWSSeries}
    // { title : 'Low Level Design', items : SystemDesign}


   ];
