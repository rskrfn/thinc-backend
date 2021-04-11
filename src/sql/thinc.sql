-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 09, 2021 at 04:15 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

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
  `course_name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `course_level` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_name`, `category`, `description`, `course_level`, `price`) VALUES
(300, 'Front-end fundamentals', 'Software', 'Learn the fundamentals of front end...', 1, 0),
(301, 'HTML for Beginners', 'Software', 'HTML from scratch', 1, 0),
(302, 'History of Europe', 'History', 'The history of Europe concerns itself...', 1, 0),
(303, 'Know more Javascript', 'Software', 'Javascript from the basic for beginner. JavaScript is a programming language that adds interactivity to your website. This happens in games, in the behavior of responses when buttons are pressed or with data entry on forms; with dynamic styling; with animation, etc. This class helps you get started with JavaScript and furthers your understanding of what is possible.', 1, 0),
(304, 'HTML and CSS to code', 'Software', 'Start combining HTML and CSS to...', 2, 10),
(305, 'Business and Financial Modeling', 'Software', 'Designed to help you make...', 1, 0),
(306, 'Marketing in a Digital World', 'Software', 'This class examines how digital...', 2, 10),
(307, 'Indonesian war history', 'History', 'From the first colonialization until...', 3, 50),
(308, 'Ancient Egypt and Its Civilization', 'History', 'Colossal pyramids, imposing temples...', 2, 10),
(309, 'Buddhism and Modern Psychology', 'Psychology', 'Buddhism and science are deeply...', 1, 0),
(310, 'Social Psychology', 'Psychology', 'This class offers some answers...', 3, 50),
(311, 'Financial markets', 'Finance', 'An overview of the ideas, methods...', 2, 10),
(312, 'Corporate finance', 'Finance', 'Introduction to the fundamentals...', 3, 50),
(313, 'Banking Finance', 'Finance', 'Explore the dynamic, fast-paced...', 3, 50),
(314, 'Algorithm specialization', 'Math', 'Learn to think like a computer...', 3, 50),
(315, 'Trigonometry', 'Math', 'Trigonometry helps us find angles...', 3, 50),
(316, 'Algebra', 'Math', 'Branch of mathematics dealing with...', 2, 10),
(319, 'Molecular Biology', 'Science', 'Study the coposition, structure..', 2, 10);

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
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `subcourse_id` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`id`, `user_id`, `course_id`, `subcourse_id`, `score`) VALUES
(1, 102, 300, 500, 100),
(2, 102, 300, 501, 42),
(3, 102, 300, 502, 21),
(4, 102, 300, 503, 98),
(5, 102, 300, 504, 86),
(6, 102, 300, 505, 72),
(7, 102, 300, 506, NULL),
(8, 102, 300, 507, NULL),
(9, 102, 300, 508, NULL),
(10, 102, 300, 509, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subcourses`
--

CREATE TABLE `subcourses` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `subcourse_name` varchar(255) NOT NULL,
  `schedule` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcourses`
--

INSERT INTO `subcourses` (`id`, `course_id`, `subcourse_name`, `schedule`, `duration`) VALUES
(500, 300, 'HTML Essential Training', NULL, NULL),
(501, 300, 'CSS Essential Training', NULL, NULL),
(502, 300, 'Javascript Essential Training', NULL, NULL),
(503, 300, 'Responsive Layout', NULL, NULL),
(504, 300, 'Mid-term Exam', NULL, NULL),
(505, 300, 'Bootstrap4 Essential Training', NULL, NULL),
(506, 300, 'Sass Essential Training', NULL, NULL),
(507, 300, 'Learning React.js', NULL, NULL),
(508, 300, 'UX for Web Design', NULL, NULL),
(509, 300, 'Final-term Exam', NULL, NULL);

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
  `user_level` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `user_level`) VALUES
(101, 'Emir Kharisma', 'kharismaemir', 'emirkharisma@arkademy.com', '$2b$10$ftRrWHWxtt56NL98xZNsSeFumLsJN.zDS6moY/ELDJY7Go2Df7H0m', 2),
(102, 'Arka', 'arkademy', 'arka@arkademy.com', '$2b$10$wwgMMVuR.XmEsJRXlf5Nu.xOZtPked5TOGpLTDSf6lWPxnlFGUM4q', 1),
(103, 'Mylo', 'longboi', 'mylo@catsmafia.com', '$2b$10$wbSr7jJ4TUNSTa5yzLce3OE6YYSToFBIeHfXZ6dKBsR1gSxgjgM1y', 2);

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
(1, 102, 300),
(2, 102, 301),
(3, 102, 302),
(4, 102, 315),
(5, 102, 316),
(6, 102, 313);

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
-- Indexes for table `messages`
--
ALTER TABLE `messages`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=320;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subcourses`
--
ALTER TABLE `subcourses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=510;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
