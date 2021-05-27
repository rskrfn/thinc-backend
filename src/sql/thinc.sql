-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2021 at 04:36 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thinc`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `id_facilitator` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `id_category` int(11) NOT NULL,
  `description` text NOT NULL,
  `objective` text NOT NULL,
  `course_level` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `schedule` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `backdrop` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `id_facilitator`, `course_name`, `id_category`, `description`, `objective`, `course_level`, `price`, `schedule`, `start_time`, `end_time`, `backdrop`) VALUES
(300, 0, 'Front-end fundamentals', 1, 'Front end development manages everything that users visually see first in their browser or application. Front end developers are responsible for the look and feel of a site. Front end development is mostly focused on what some may coin the \"client side\" of development.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit blandit risus, tempor ullamcorper metus sit accumsan. Dictum sit tincidunt turpis malesuada arcu amet cursus blandit. Sociis diam elit imperdiet eget posuere id sagittis. ', 1, 0, '0000-00-00', '00:00:00', '00:00:00', NULL),
(301, 0, 'HTML for Beginners', 1, 'HTML from scratch', '', 1, 0, '0000-00-00', '00:00:00', '00:00:00', NULL),
(302, 0, 'History of Europe', 2, 'The history of Europe concerns itself...', '', 1, 0, '0000-00-00', '00:00:00', '00:00:00', NULL),
(303, 0, 'Know more Javascript', 1, 'Javascript from the basic for beginner. JavaScript is a...', '', 1, 0, '0000-00-00', '00:00:00', '00:00:00', NULL),
(304, 0, 'HTML and CSS to code', 1, 'Start combining HTML and CSS to...', '', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(305, 0, 'Business and Financial Modeling', 4, 'Designed to help you make...', '', 1, 0, '0000-00-00', '00:00:00', '00:00:00', NULL),
(306, 0, 'Marketing in a Digital World', 4, 'This class examines how digital...', '', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(307, 0, 'Indonesian war history', 2, 'From the first colonialization until...', '', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(308, 0, 'Ancient Egypt and Its Civilization', 2, 'Colossal pyramids, imposing temples...', '', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(309, 0, 'Buddhism and Modern Psychology', 2, 'Buddhism and science are deeply...', '', 1, 0, '0000-00-00', '00:00:00', '00:00:00', NULL),
(310, 0, 'Social Psychology', 2, 'This class offers some answers...', '', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(311, 0, 'Financial markets', 4, 'An overview of the ideas, methods...', '', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(312, 0, 'Corporate finance', 4, 'Introduction to the fundamentals...', '', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(313, 0, 'Banking Finance', 4, 'Explore the dynamic, fast-paced...', '', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(314, 0, 'Algorithm specialization', 1, 'Learn to think like a computer...', '', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(315, 0, 'Trigonometry', 5, 'Trigonometry helps us find angles...', '', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(316, 0, 'Algebra', 5, 'Branch of mathematics dealing with...', '', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(319, 0, 'Molecular Biology', 6, 'Study the coposition, structure..', '', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_category`
--

CREATE TABLE `course_category` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_category`
--

INSERT INTO `course_category` (`id`, `category`, `thumbnail`) VALUES
(1, 'Software', NULL),
(2, 'History', NULL),
(3, 'Psychology', NULL),
(4, 'Finance', NULL),
(5, 'Math', NULL),
(6, 'Science', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_level`
--

CREATE TABLE `course_level` (
  `level_id` int(11) NOT NULL,
  `level_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_level`
--

INSERT INTO `course_level` (`level_id`, `level_name`) VALUES
(1, 'Beginner'),
(2, 'Intermediate'),
(3, 'Advance');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message_content` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `otp_code` int(11) NOT NULL,
  `valid_until` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `id` int(11) NOT NULL,
  `id_user_course` int(11) NOT NULL,
  `id_subcourses` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`id`, `id_user_course`, `id_subcourses`, `score`) VALUES
(1, 7, 500, 80),
(2, 7, 501, 70),
(3, 7, 502, 75),
(4, 7, 503, 85),
(5, 7, 504, 50),
(6, 7, 505, 90),
(7, 7, 506, NULL),
(8, 7, 507, NULL),
(9, 7, 508, NULL),
(10, 7, 509, NULL),
(11, 8, 510, 90),
(12, 8, 511, NULL),
(13, 8, 512, NULL),
(14, 8, 513, NULL),
(19, 16, 514, NULL),
(20, 16, 515, NULL),
(21, 16, 516, NULL),
(22, 16, 517, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subcourses`
--

CREATE TABLE `subcourses` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `subcourse_name` varchar(255) NOT NULL,
  `objective` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcourses`
--

INSERT INTO `subcourses` (`id`, `course_id`, `subcourse_name`, `objective`) VALUES
(500, 300, 'HTML Essential Training', 'Learning HTML'),
(501, 300, 'CSS Essential Training', 'Learning CSS'),
(502, 300, 'Javascript Essential Training', 'Learning JavaScript'),
(503, 300, 'Responsive Layout', 'Learning about responsive layout'),
(504, 300, 'Mid-term Exam', 'Mid-term exam to measure your knowledge'),
(505, 300, 'Bootstrap4 Essential Training', 'Learning how to use Bootstrap'),
(506, 300, 'Sass Essential Training', 'Learning Sass'),
(507, 300, 'Learning React.js', 'Learning React.js'),
(508, 300, 'UX for Web Design', 'Learning UX'),
(509, 300, 'Final-term Exam', 'Final-term exam to measure your knowledge'),
(510, 301, 'Subcourse 1', 'Objective 1'),
(511, 301, 'Subcourse 2', 'Objective 2'),
(512, 301, 'Subcourse 3', 'Objective 3'),
(513, 301, 'Subcourse 4', 'Objective 4'),
(514, 302, 'Subcourse 1', 'Objective 1'),
(515, 302, 'Subcourse 2', 'Objective 2'),
(516, 302, 'Subcourse 3', 'Objective 3'),
(517, 302, 'Subcourse 4', 'Objective 4'),
(518, 303, 'Subcourse 1', 'Objective 1'),
(519, 303, 'Subcourse 2', 'Objective 2'),
(520, 303, 'Subcourse 3', 'Objective 3'),
(521, 303, 'Subcourse 4', 'Objective 4'),
(522, 304, 'Subcourse 1', 'Objective 1'),
(523, 304, 'Subcourse 2', 'Objective 2'),
(524, 304, 'Subcourse 3', 'Objective 3'),
(525, 304, 'Subcourse 4', 'Objective 4');

-- --------------------------------------------------------

--
-- Table structure for table `token_blacklist`
--

CREATE TABLE `token_blacklist` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expire` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `display_picture` varchar(255) DEFAULT NULL,
  `user_level` int(1) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `phone`, `display_picture`, `user_level`) VALUES
(101, 'Emir Kharisma', 'kharismaemir', 'emirkharisma@arkademy.com', '$2b$10$ftRrWHWxtt56NL98xZNsSeFumLsJN.zDS6moY/ELDJY7Go2Df7H0m', '0', '', 2),
(139, 'Muhammad Ilham', 'member', 'Ilham@example.com', '$2b$10$1WItFkk0ZkWE5l/AKyGHrOIuQjiWPZXasEf2svFDTfLjkAofodkEG', '6287870720735', NULL, 2),
(140, 'Elenna Liandra', 'Elenn', 'alzamafero@gmail.com', '$2b$10$bsilQLt6uCTMsAWsw9OC8uBdnJC44jBxJVffBBu0qFnQM9GmUh.Km', '6288877776666', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_course`
--

INSERT INTO `user_course` (`id`, `user_id`, `course_id`) VALUES
(1, 101, 300),
(2, 101, 301),
(3, 101, 302),
(4, 101, 315),
(5, 101, 316),
(6, 101, 313),
(7, 140, 300),
(8, 140, 301),
(9, 139, 301),
(16, 140, 302);

-- --------------------------------------------------------

--
-- Table structure for table `user_level`
--

CREATE TABLE `user_level` (
  `level_id` int(11) NOT NULL,
  `level_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_level`
--

INSERT INTO `user_level` (`level_id`, `level_name`) VALUES
(1, 'Facilitator'),
(2, 'Member');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_category`
--
ALTER TABLE `course_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcourses`
--
ALTER TABLE `subcourses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=324;

--
-- AUTO_INCREMENT for table `course_category`
--
ALTER TABLE `course_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `subcourses`
--
ALTER TABLE `subcourses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=526;

--
-- AUTO_INCREMENT for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
