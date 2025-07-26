import { useState } from 'react';
import { motion } from 'framer-motion';
import SoundwaveImage from '../assets/Soundwave.png';
import linkbookImage from '../assets/linkbook.png';
import agriImage from '../assets/agri.jpeg';  
import cyberImage from '../assets/cyber.png';
import waveImage from '../assets/wave.png';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
  id: 1,
  title: 'Link-Book',
  description: 'A social hub for pros(LinkedIN x Facebook): network, connect, and collaborate in one sleek app.',
  image: linkbookImage, // Use your imported image variable
  category: '1',
  technologies: ['Java', 'Spring Boot', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
  codeLink: 'https://github.com/Omnific1'
    },
    {
  id: 2,
  title: 'AgriMart',
  description: 'Empowering farmers with instant access to agri-machinery—rent, connect, and grow.',
  image: agriImage, // Use your imported image variable here
  category: '2',
  technologies: ['Java', 'Spring Boot', 'AWS', 'Twilio', 'WhatsApp API'],
  codeLink: 'https://github.com/Omnific1'
   },

    {
    id: 3,
    title: 'CyberShield',
    description: 'Smart AI that keeps cyberbullies out—text, voice, and images, all in real time.',
    image: cyberImage, // Use your imported image variable
    category: '1',
    technologies: ['Python', 'LSTM', 'AWS Lambda', 'Twitter API'],
    codeLink: 'https://github.com/Omnific1'
    },

    {
      id: 4,
      title: 'Soundwave',
      description: 'A modern music streaming platform with beautiful UI, playlist management, and audio controls. Built with responsive design and smooth animations.',
      image: SoundwaveImage,
      category: '2',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Web Audio API'],
      codeLink: 'https://github.com/Omnific1'
    },
    
    {
    id: 5,
    title: 'Wave to Control',
    description: 'Control your media with a gesture—no touch, just magic.',
    image: waveImage, // Use your imported image variable
    category: '2',
    technologies: ['Arduino', 'Ultrasonic Sensor', 'Python'],
    codeLink: 'https://github.com/Omnific1'
    }


    
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.section
      id="projects"
      className="py-20 bg-white dark:bg-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-none">Projects</h2>
          <div className="w-16 h-0.5 bg-black dark:bg-white mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Explore my recent work and projects. Each one is crafted with attention to detail and designed to solve specific problems.
          </p>
        </motion.div>

        <motion.div className="flex justify-center mb-12" variants={itemVariants}>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { key: 'all', label: 'All' },
              { key: '1', label: '1' },
              { key: '2', label: '2' }
            ].map((button, index) => (
              <motion.button
                key={button.key}
                onClick={() => setFilter(button.key)}
                className={`px-6 py-3 border-2 font-medium transition-all duration-300 ${
                  filter === button.key
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                    : 'bg-transparent text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {button.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
              No projects found for this category.
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative mx-auto max-w-md lg:max-w-none"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
              >
                <motion.div
                  className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-full h-full border-2 border-black dark:border-white opacity-30"
                  initial={{ scale: 0, rotate: -5 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                ></motion.div>
                <motion.div
                  className="bg-white dark:bg-black border-2 border-black dark:border-white overflow-hidden relative z-10"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black dark:bg-white opacity-0 flex items-center justify-center"
                      whileHover={{ opacity: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <motion.a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-black text-black dark:text-white px-4 sm:px-6 py-2 sm:py-3 border-2 border-black dark:border-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300 text-sm sm:text-base text-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          View Code
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2">{project.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 font-light leading-relaxed text-sm sm:text-base">{project.description}</p>
                    <motion.div
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-2 sm:px-3 py-1 bg-transparent border-2 border-black dark:border-white text-black dark:text-white text-xs sm:text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 * techIndex }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>

        <motion.div className="text-center mt-12" variants={itemVariants}>
          <motion.a
            href="https://github.com/Omnific1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-black dark:border-white bg-transparent text-black dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Check out my GitHub
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
