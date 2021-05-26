-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2021 at 05:30 AM
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

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `user_id`, `otp_code`, `valid_until`, `timestamp`) VALUES
(8, 139, 8238, '2021-05-13T15:22:42Z', '2021-05-13 19:22:42'),
(9, 139, 8900, '2021-05-13T21:30:39Z', '2021-05-14 01:30:39'),
(10, 140, 25, '2021-05-13T21:34:01Z', '2021-05-14 01:34:01'),
(11, 140, 8705, '2021-05-13T21:35:21Z', '2021-05-14 01:35:21'),
(12, 140, 5296, '2021-05-13T21:36:26Z', '2021-05-14 01:36:26'),
(13, 140, 6271, '2021-05-13T22:00:22Z', '2021-05-14 02:00:22'),
(14, 140, 2369, '2021-05-13T22:01:51Z', '2021-05-14 02:01:51'),
(15, 140, 8216, '2021-05-13T22:05:20Z', '2021-05-14 02:05:20'),
(16, 139, 1770, '2021-05-22T17:32:14Z', '2021-05-22 21:32:14'),
(17, 140, 853, '2021-05-22T17:54:55Z', '2021-05-22 21:54:55'),
(18, 140, 6460, '2021-05-22T17:57:35Z', '2021-05-22 21:57:35'),
(19, 140, 4770, '2021-05-22T18:06:38Z', '2021-05-22 22:06:38'),
(20, 140, 7886, '2021-05-22T18:09:11Z', '2021-05-22 22:09:11'),
(21, 140, 2848, '2021-05-23T06:47:00Z', '2021-05-23 10:47:00'),
(22, 140, 8750, '2021-05-23T06:55:36Z', '2021-05-23 10:55:36'),
(23, 140, 9622, '2021-05-23T06:56:13Z', '2021-05-23 10:56:13'),
(24, 140, 874, '2021-05-23T07:18:49Z', '2021-05-23 11:18:49'),
(25, 140, 256, '2021-05-23T07:20:50Z', '2021-05-23 11:20:50'),
(26, 140, 563, '2021-05-23T07:36:23Z', '2021-05-23 11:36:23'),
(27, 140, 2640, '2021-05-23T07:59:23Z', '2021-05-23 11:59:23');

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
(1, 7, 500, NULL),
(2, 7, 501, NULL),
(3, 7, 502, NULL),
(4, 7, 503, NULL),
(5, 7, 504, NULL),
(6, 7, 505, NULL),
(7, 7, 506, NULL),
(8, 7, 507, NULL),
(9, 7, 508, NULL),
(10, 7, 509, NULL),
(11, 8, 510, NULL),
(12, 8, 511, NULL),
(13, 8, 512, NULL),
(14, 8, 513, NULL),
(15, 9, 510, NULL),
(16, 9, 511, NULL),
(17, 9, 512, NULL),
(18, 9, 513, NULL);

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
(510, 301, 'Subcourse 1', NULL),
(511, 301, 'Subcourse 2', NULL),
(512, 301, 'Subcourse 3', NULL),
(513, 301, 'Subcourse 4', NULL);

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
(139, 'Muhammad Ilham', 'member', 'Ilham@example.com', '$2b$10$iVdLFeGZxsVicZcyjXuetOTvgjholfxTRYAmQCsRTBIQJOQycqrUu', '6287870720737', NULL, 2),
(140, 'Elenna Liandra', 'Elenn', 'alzamafero@gmail.com', '$2b$10$IvxAJh0tm5HbsjG7VNerM.GIsfgI4ITccw1Z9h/EhakYYIwUSDQ0.', '6288877776665', NULL, 2);

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
(9, 139, 301);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `subcourses`
--
ALTER TABLE `subcourses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=514;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
