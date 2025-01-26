const LinkedInBaseURL = 'https://lnkd.in/';
const GitHubBaseURL = 'https://github.com/';
const MediumBaseURL = 'https://medium.com/';
const OverleafBaseURL = "https://www.overleaf.com/latex/templates/";
const RefactoringGuruBaseURL = 'https://refactoring.guru/design-patterns/';

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
  
export const DataStructuresNotes = [
    { id: 1, title: ResourcesTitle.STL, link: "https://www.linkedin.com/posts/kapilyadav22_c-stl-notes-activity-6873598326260994048-B4Pb/" },
    { id: 2, title: ResourcesTitle.SortingAlgorithms, link: LinkedInBaseURL + 'gJWWHX5m' },
    { id: 3, title: ResourcesTitle.SinglyLinkedList, link: LinkedInBaseURL + 'gNury6T9' },
    { id: 4, title: ResourcesTitle.GreedyApproach, link: LinkedInBaseURL + 'gsAvp5k7' },
    { id: 5, title: ResourcesTitle.HashMap, link: LinkedInBaseURL + 'g9EzR2V8' },
    { id: 6, title: ResourcesTitle.BitManipulation, link: LinkedInBaseURL + 'gcpZeetG' },
    { id: 7, title: ResourcesTitle.DPPart1, link: LinkedInBaseURL + 'gq_Nw8S8' },
    { id: 8, title: ResourcesTitle.DPPart2, link: LinkedInBaseURL + 'gXT4aRtn' },
    { id: 9, title: ResourcesTitle.AlgorithmShortNotes, link: LinkedInBaseURL + 'gQNumHam' },
    { id: 10, title: ResourcesTitle.GraphPart1, link: LinkedInBaseURL + 'gFdD8hwH' },
    { id: 11, title: ResourcesTitle.GraphPart2, link: LinkedInBaseURL + 'gB5MYEzQ' },

  ];

  export const CompetitiveProgramming = [
    { id: 1, title: ResourcesTitle.CP31, image: "", link: 'https://www.tle-eliminators.com/cp-sheet' },
    { id: 2, title: ResourcesTitle.ACD, image: "", link: 'https://acodedaily.com/' },
    { id: 3, title: ResourcesTitle.CSES, image: "", link: 'https://cses.fi/problemset/' },
    { id: 4, title: ResourcesTitle.CPBOOK, image: "", link: GitHubBaseURL + 'pllk/cphb' },
    // { id: 1, title: ResourcesTitle.CP31, image: "", link:  ''},
  ]

  export const CreationalDesignPatterns = [
    { id: 1, title: 'Creational Patterns with Code', image: "", link: GitHubBaseURL + 'kapilyadav22/DesignPatterns/tree/main/src/CreationalDesignPattern' },
    { id: 2, title: Creational.SINGLETON, image: "", link: 'https://blog.algomaster.io/p/singleton-design-pattern' },
    { id: 3, title: Creational.FACTORY_METHOD, image: "", link: RefactoringGuruBaseURL + 'factory-method' },
    { id: 4, title: Creational.ABSTRACT_FACTORY, image: "", link: RefactoringGuruBaseURL + 'abstract-factory' },
    { id: 5, title: Creational.BUILDER, image: "", link: RefactoringGuruBaseURL + 'builder' },
    { id: 6, title: Creational.PROTOTYPE, image: "", link: RefactoringGuruBaseURL + 'prototype' },
]

   
export const StructuralDesignPatterns = [
  { id: 1, title: 'Structural Patterns with Code', image: "", link: GitHubBaseURL + 'kapilyadav22/DesignPatterns/tree/main/src/StructuralPatterns' },
  { id: 2, title: Structural.ADAPTER, image: "", link: RefactoringGuruBaseURL + 'adapter' },
  { id: 3, title: Structural.BRIDGE, image: "", link: RefactoringGuruBaseURL + 'bridge' },
  { id: 4, title: Structural.COMPOSITE, image: "", link: RefactoringGuruBaseURL + 'composite' },
  { id: 5, title: Structural.DECORATOR, image: "", link: RefactoringGuruBaseURL + 'decorator' },
  { id: 6, title: Structural.FACADE, image: "", link: RefactoringGuruBaseURL + 'facade' },
  { id: 7, title: Structural.FLYWEIGHT, image: "", link: RefactoringGuruBaseURL + 'flyweight' },
  { id: 8, title: Structural.PROXY, image: "", link: RefactoringGuruBaseURL + 'proxy' },
]

export const BehaviouralDesignPatterns = [
  { id: 1, title: 'Behavioural Patterns with Code', image: "", link: GitHubBaseURL + 'kapilyadav22/DesignPatterns/tree/main/src/BehaviouralPatterns' },
  { id: 2, title: Behavioral.CHAIN_OF_RESPONSIBILITY, image: "", link: RefactoringGuruBaseURL + 'chain-of-responsibility' },
  { id: 3, title: Behavioral.COMMAND, image: "", link: RefactoringGuruBaseURL + 'command' },
  // { id: 3, title: Behavioral.INTERPRETER, image: "", link: '' },
  { id: 3, title: Behavioral.ITERATOR, image: "", link: RefactoringGuruBaseURL + 'iterator' },
  { id: 5, title: Behavioral.MEDIATOR, image: "", link: RefactoringGuruBaseURL + 'mediator' },
  { id: 6, title: Behavioral.MEMENTO, image: "", link: RefactoringGuruBaseURL + 'memento' },
  { id: 7, title: Behavioral.OBSERVER, image: "", link: RefactoringGuruBaseURL + 'observer' },
  { id: 8, title: Behavioral.STATE, image: "", link: RefactoringGuruBaseURL + 'state' },
  { id: 9, title: Behavioral.STRATEGY, image: "", link: RefactoringGuruBaseURL + 'strategy' },
  { id: 10, title: Behavioral.TEMPLATE_METHOD, image: "", link: RefactoringGuruBaseURL + 'template-method' },
  { id: 11, title: Behavioral.VISITOR, image: "", link: RefactoringGuruBaseURL + 'visitor' },
]


export const SystemDesign = [
  { id: 1, title: "One Stop Solution For System Design By Shivam Bhadani", image: "", link: MediumBaseURL + '@shivambhadani_/system-design-for-beginners-everything-you-need-in-one-article-c74eb702540b' },
]

export const AWSSeries = [
  { id: 1, title: "Introduction to Cloud and EC2", image: "", link: MediumBaseURL + '@shivambhadani_/aws-part-1-introduction-to-cloud-and-ec2-f06cdc80a1fc' },
  { id: 2, title: "A Beginner’s Guide to Understanding AWS EBS Volumes", image: "", link: MediumBaseURL + '@shivambhadani_/aws-part-2-a-beginners-guide-to-understanding-aws-ebs-volumes-a6f87b1140c8' },
  { id: 3, title: "Horizontal Scaling and Load Balancer", image: "", link: MediumBaseURL + '@shivambhadani_/aws-part-3-horizontal-scaling-and-load-balancer-223d005ef11e' },
  { id: 4, title: "Step-by-Step Guide to Create Your First AWS Auto Scaling Group", image: "", link: MediumBaseURL + '@shivambhadani_/aws-part-4-step-by-step-guide-to-create-your-first-aws-auto-scaling-group-826c1effc0ec' },
  { id: 5, title: "Learn Complete AWS VPC in Just One Article", image: "", link: MediumBaseURL + '@shivambhadani_/aws-part-5-learn-complete-aws-vpc-in-just-one-article-5ffe34888a5c' },
]

export const ResumeTemplates = [
  { id: 1, title: "Resume Professional Template - Software Engineer", image: "", link: OverleafBaseURL + 'resume-professional-template-software-engineer/ttwtyxskrcsz' },
  { id: 2, title: "Resume Public", image: "", link: OverleafBaseURL + 'resume-public/hmhyxvxfspsw' },
  { id: 3, title: "AlgoUniversity Student Resume Template", image: "", link: OverleafBaseURL + 'algouniversity-student-resume-template/kvnkfvqcytfd' },
  ]

export const DockerData = [
    { id: 1, title: "Docker", image: "", link: MediumBaseURL + '@kmdkhadeer/docker-get-started-9aa7ee662cea' },
    { id: 2, title: "Docker Compose", image: "", link:  MediumBaseURL + 'dev-sec-ops/docker-101-docker-compose-db96ae884cda'},
    { id: 3, title: "Docker Series By Piyush Garg", image: "", link: 'https://www.youtube.com/watch?v=zCsbp_iBTq8&list=PLinedj3B30sDvBfeK9EPz9pcJNlM0f3ph' },
  ]

  export const JavaScript = [
    { id: 1, title: "Arrays In JS", image: "", link: 'https://www.linkedin.com/posts/kapilyadav22_arrays-in-js-activity-7288193765981241345-YUxL' },
    { id: 2, title: "Namaste JavaScript Notes", image: "", link:  GitHubBaseURL + 'kapilyadav22/javascript-basics/blob/master/namaste_javascript.pdf' },
    { id: 3, title: "Namaste React Notes", image: "", link: GitHubBaseURL + 'kapilyadav22/javascript-basics/blob/master/Namaste_React.pdf' },
    { id: 4, title: "Chai aur JavaScript", image: "", link:   'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37' },
  ]

   // { id: 1, title: "", image: "", link:   '' },
    // { id: 2, title: "", image: "", link: '' },
    // { id: 3, title: "", image: "", link:  ''}

  export const Java = [
    { id: 1, title: 'Java 8 Fundamentals', link: GitHubBaseURL + 'kapilyadav22/Java-8-Fundamentals' },
    { id: 2, title: ResourcesTitle.LambdaExpressionsJava, link: LinkedInBaseURL + 'gqx5JY3F' },
    { id: 3, title: ResourcesTitle.JavaCollections, link: LinkedInBaseURL + 'gbyeptgB' },
    { id: 4, title: 'Spring Framework Basics', link: GitHubBaseURL + 'kapilyadav22/Spring' },
  ]

  export const OOPS = [
    { id: 1, title: ResourcesTitle.OOPsNotes, link: LinkedInBaseURL + 'gR2HJ8TB' },
     // { id: 1, title: "", image: "", link:   '' },
  ]

  export const ComputerNetworks = [
    { id: 1, title: ResourcesTitle.ComputerNetworksNotes, link: LinkedInBaseURL + 'gdrA476E' },

  ]

  export const OperatingSystem = [
    { id: 1, title: ResourcesTitle.OperatingSystemPart1, link: LinkedInBaseURL + 'gDx2sTtY' },
    { id: 2, title: ResourcesTitle.OperatingSystemPart2, link: LinkedInBaseURL + 'gtVXFWEg' },
    { id: 3, title: ResourcesTitle.OperatingSystemShortNotes, link: LinkedInBaseURL + 'gycDD_tS' },

  ]

  export const CompilerDesign = [
    { id: 1, title: ResourcesTitle.CompilerDesignNotes, link: LinkedInBaseURL + 'gsy9CxQb' },
  ]

  export const NodeJS = [
    { id: 1, title: "Node JS", link: GitHubBaseURL + 'cat-backend-nodejs/nodejs-roadmap' },
    // { id: 2, title: "Node JS", link: GitHubBaseURL + 'cat-backend-nodejs/nodejs-roadmap' },
  ]

  export const resourcesData = [
    { title: 'Resume Templates', items: ResumeTemplates},
    { title: 'Data Structures Notes', items: DataStructuresNotes},
    { title: 'Java', items: Java},
    { title: 'JavaScript', items: JavaScript},
    { title: 'Node Js', items: NodeJS},
    { title: 'OOPS', items: OOPS},
    { title: 'Competitive Programming', items : CompetitiveProgramming},
    { title: 'Docker', items: DockerData},
    {title: 'Compiler Design', items: CompilerDesign },
    {title: 'Computer Networks', items: ComputerNetworks },
    {title: 'One Stop Solution for System Design', items: SystemDesign},
    { title: 'Creational Design Patterns', items: CreationalDesignPatterns},
    { title: 'Structual Design Patterns', items: StructuralDesignPatterns},
    {title: 'Behavioural Design Patterns', items: BehaviouralDesignPatterns},
    {title: 'AWS Series By Shivam Bhadani', items: AWSSeries}
    // { title : 'Low Level Design', items : SystemDesign}
   ];
