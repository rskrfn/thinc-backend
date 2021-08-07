-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2021 at 08:35 PM
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

INSERT INTO `courses` (`id`, `id_facilitator`, `course_name`, `id_category`, `description`, `course_level`, `price`, `schedule`, `start_time`, `end_time`, `backdrop`) VALUES
(300, 148, 'Front-end fundamentals', 1, 'Front end development manages everything that users visually see first in their browser or application. Front end developers are responsible for the look and feel of a site. Front end development is mostly focused on what some may coin the \"client side\" of development.', 1, 0, '2021-07-01', '09:00:00', '10:45:00', NULL),
(301, 148, 'HTML for Beginners', 1, 'HTML from scratch', 1, 0, '2021-07-02', '09:00:00', '10:45:00', NULL),
(302, 150, 'History of Europe', 2, 'The history of Europe concerns itself...', 1, 0, '2021-07-01', '12:00:00', '13:45:00', NULL),
(303, 148, 'Know more Javascript', 1, 'Javascript from the basic for beginner. JavaScript is a...', 1, 0, '2021-07-03', '09:00:00', '10:45:00', NULL),
(304, 148, 'HTML and CSS to code', 1, 'Start combining HTML and CSS to...', 2, 10, '2021-07-04', '09:00:00', '10:45:00', NULL),
(305, 0, 'Business and Financial Modeling', 4, 'Designed to help you make...', 1, 0, '0000-00-00', '00:00:00', '00:00:00', NULL),
(306, 0, 'Marketing in a Digital World', 4, 'This class examines how digital...', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(307, 150, 'Indonesian war history', 2, 'From the first colonialization until...', 3, 50, '2021-07-01', '00:00:00', '00:00:00', NULL),
(308, 150, 'Ancient Egypt and Its Civilization', 2, 'Colossal pyramids, imposing temples...', 2, 10, '2021-07-01', '07:00:00', '08:45:00', NULL),
(309, 150, 'Buddhism and Modern Psychology', 2, 'Buddhism and science are deeply...', 1, 0, '0000-00-00', '00:00:00', '00:00:00', NULL),
(310, 150, 'Social Psychology', 2, 'This class offers some answers...', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(311, 0, 'Financial markets', 4, 'An overview of the ideas, methods...', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(312, 0, 'Corporate finance', 4, 'Introduction to the fundamentals...', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(313, 0, 'Banking Finance', 4, 'Explore the dynamic, fast-paced...', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(314, 148, 'Algorithm specialization', 1, 'Learn to think like a computer...', 3, 50, '2021-07-05', '09:00:00', '10:45:00', NULL),
(315, 0, 'Trigonometry', 5, 'Trigonometry helps us find angles...', 3, 50, '0000-00-00', '00:00:00', '00:00:00', NULL),
(316, 0, 'Algebra', 5, 'Branch of mathematics dealing with...', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(319, 0, 'Molecular Biology', 6, 'Study the coposition, structure..', 2, 10, '0000-00-00', '00:00:00', '00:00:00', NULL),
(327, 148, 'Programming Language ', 1, 'Programming language will cover ...', 3, 50, '2021-07-01', '09:00:00', '10:45:00', NULL);

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
-- Table structure for table `group_messages`
--

CREATE TABLE `group_messages` (
  `id` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message_content` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(66, 139, 9790, '2021-07-07T07:00:52Z', '2021-07-07 11:00:52');

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
(47, 9, 500, 90),
(48, 9, 501, 70),
(49, 9, 502, NULL),
(50, 9, 503, NULL),
(51, 9, 504, NULL),
(52, 9, 505, NULL),
(53, 9, 506, NULL),
(54, 9, 507, NULL),
(55, 9, 508, NULL),
(56, 9, 509, NULL),
(57, 10, 510, NULL),
(58, 10, 511, NULL),
(59, 10, 512, NULL),
(60, 10, 513, NULL),
(61, 11, 514, NULL),
(62, 11, 515, NULL),
(63, 11, 516, NULL),
(64, 11, 517, NULL),
(65, 12, 500, 90),
(66, 12, 501, 70),
(67, 12, 502, NULL),
(68, 12, 503, NULL),
(69, 12, 504, NULL),
(70, 12, 505, NULL),
(71, 12, 506, NULL),
(72, 12, 507, NULL),
(73, 12, 508, NULL),
(74, 12, 509, NULL),
(75, 13, 510, NULL),
(76, 13, 511, NULL),
(77, 13, 512, NULL),
(78, 13, 513, NULL),
(79, 14, 518, NULL),
(80, 14, 519, NULL),
(81, 14, 520, NULL),
(82, 14, 521, NULL),
(83, 15, 522, NULL),
(84, 15, 523, NULL),
(85, 15, 524, NULL),
(86, 15, 525, NULL),
(87, 21, 514, NULL),
(88, 21, 515, NULL),
(89, 21, 516, NULL),
(90, 21, 517, NULL),
(91, 23, 540, NULL),
(92, 23, 541, NULL),
(93, 23, 542, NULL),
(94, 23, 543, NULL),
(95, 24, 540, 90),
(96, 24, 541, 50),
(97, 24, 542, NULL),
(98, 24, 543, NULL),
(99, 25, 580, NULL),
(100, 25, 581, NULL),
(101, 25, 582, NULL),
(102, 25, 583, NULL);

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
(510, 301, 'HTML Introduction', 'Introduction to HTML'),
(511, 301, 'HTML Structure', 'Structure of HTML'),
(512, 301, 'Flex and Grid System', 'Introduction to Flex and Grid System'),
(513, 301, 'Bootstrap', 'Introduction to Bootstrap'),
(514, 302, 'Subcourse 1', 'Objective 1'),
(515, 302, 'Subcourse 2', 'Objective 2'),
(516, 302, 'Subcourse 3', 'Objective 3'),
(517, 302, 'Subcourse 4', 'Objective 4'),
(518, 303, 'Subcourse 1', 'Objective 1'),
(519, 303, 'Subcourse 2', 'Objective 2'),
(520, 303, 'Subcourse 3', 'Objective 3'),
(521, 303, 'Subcourse 4', 'Objective 4'),
(522, 304, 'HTML & CSS Introduction', 'Recap about HTML and Introduction to CSS'),
(523, 304, 'How to use HTML & CSS', 'Learning to combine HTML and CSS'),
(524, 304, 'Making simple page', 'Learn to make simple web page'),
(525, 304, 'Responsive', 'Learn to make responsive page'),
(526, 305, 'Subcourse 1', 'Objective 1'),
(527, 305, 'Subcourse 2', 'Objective 2'),
(528, 305, 'Subcourse 3', 'Objective 3'),
(529, 305, 'Subcourse 4', 'Objective 4'),
(532, 306, 'Subcourse 1', 'Objective 1'),
(533, 306, 'Subcourse 2', 'Objective 2'),
(534, 306, 'Subcourse 3', 'Objective 3'),
(535, 306, 'Subcourse 4', 'Objective 4'),
(536, 307, 'Subcourse 1', 'Objective 1'),
(537, 307, 'Subcourse 2', 'Objective 2'),
(538, 307, 'Subcourse 3', 'Objective 3'),
(539, 307, 'Subcourse 4', 'Objective 4'),
(540, 308, 'Subcourse 1', 'Objective 1'),
(541, 308, 'Subcourse 2', 'Objective 2'),
(542, 308, 'Subcourse 3', 'Objective 3'),
(543, 308, 'Subcourse 4', 'Objective 4'),
(544, 309, 'Subcourse 1', 'Objective 1'),
(545, 309, 'Subcourse 2', 'Objective 2'),
(546, 309, 'Subcourse 3', 'Objective 3'),
(547, 309, 'Subcourse 4', 'Objective 4'),
(548, 310, 'Subcourse 1', 'Objective 1'),
(549, 310, 'Subcourse 2', 'Objective 2'),
(550, 310, 'Subcourse 3', 'Objective 3'),
(551, 310, 'Subcourse 4', 'Objective 4'),
(552, 311, 'Subcourse 1', 'Objective 1'),
(553, 311, 'Subcourse 2', 'Objective 2'),
(554, 311, 'Subcourse 3', 'Objective 3'),
(555, 311, 'Subcourse 4', 'Objective 4'),
(556, 312, 'Subcourse 1', 'Objective 1'),
(557, 312, 'Subcourse 2', 'Objective 2'),
(558, 312, 'Subcourse 3', 'Objective 3'),
(559, 312, 'Subcourse 4', 'Objective 4'),
(560, 313, 'Subcourse 1', 'Objective 1'),
(561, 313, 'Subcourse 2', 'Objective 2'),
(562, 313, 'Subcourse 3', 'Objective 3'),
(563, 313, 'Subcourse 4', 'Objective 4'),
(564, 314, 'Subcourse 1', 'Objective 1'),
(565, 314, 'Subcourse 2', 'Objective 2'),
(566, 314, 'Subcourse 3', 'Objective 3'),
(567, 314, 'Subcourse 4', 'Objective 4'),
(568, 315, 'Subcourse 1', 'Objective 1'),
(569, 315, 'Subcourse 2', 'Objective 2'),
(570, 315, 'Subcourse 3', 'Objective 3'),
(571, 315, 'Subcourse 4', 'Objective 4'),
(572, 316, 'Subcourse 1', 'Objective 1'),
(573, 316, 'Subcourse 2', 'Objective 2'),
(574, 316, 'Subcourse 3', 'Objective 3'),
(575, 316, 'Subcourse 4', 'Objective 4'),
(576, 319, 'Subcourse 1', 'Objective 1'),
(577, 319, 'Subcourse 2', 'Objective 2'),
(578, 319, 'Subcourse 3', 'Objective 3'),
(579, 319, 'Subcourse 4', 'Objective 4'),
(580, 327, 'Subcourse 1', 'Objective 1'),
(581, 327, 'Subcourse 2', 'Objective 2'),
(582, 327, 'Subcourse 3', 'Objective 3'),
(583, 327, 'Subcourse 4', 'Objective 4');

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
(101, 'Emir Kharisma', 'kharismaemir', 'emirkharisma@arkademy.com', '$2b$10$kRAoS2aMEaHpxkLzYdYq9O/krP3sYC.ObMjxDjMVmG9hUpJTWPIJu', '088877776666', '/displaypicture/dp_1622776761163.jpg', 2),
(139, 'Muhammad Ilham', 'member', 'Ilham@example.com', '$2b$10$1ew0g7Ifv2vORghzIEhoDuWl7e2iPUtnUFwCTzze7nI76nHHvfEsG', '087870720735', '/displaypicture/dp_1627983625939.jpg', 2),
(140, 'Elenna Liandra', 'Elenn', 'alzamafero@gmail.com', '$2b$10$dhebHToG4HV1teyqJ2rnFOMBjUuuTV1fYYUkTfzq5G3kv/AM8qTkK', '087766663333', '/displaypicture/dp_1625021760575.jpg', 2),
(148, 'Rayendra Lazuardi', 'facilitator', 'rayendra@example.com', '$2b$10$kZDOhMNoVOpSfHBvcyF8NOgkZoGl9cwb8V/l8uCOqUFAsRhc5lvnu', NULL, '/displaypicture/dp_1623108680050.jpg', 1),
(149, 'Rinna Matteus', 'member1', 'member1@example.com', '$2b$10$zusCRkLVF1VzOR.8evtszupw..lJ2imDOXTUvhVsF.PfCvsOZ9O6a', NULL, '/displaypicture/dp_1623086095505.jpg', 2),
(150, 'Jacob Collier', 'facilitator2', 'jacob@example.com', '$2b$10$ITkxR6ESFDhme0CXFASaGuDeLl2uH2jV8sMesCke8puiAE0rARX.G', NULL, NULL, 1);

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
(9, 139, 300),
(10, 139, 301),
(11, 139, 302),
(12, 140, 300),
(13, 140, 301),
(14, 140, 303),
(15, 140, 304),
(17, 140, 314),
(18, 140, 305),
(19, 140, 306),
(21, 140, 302),
(23, 139, 308),
(24, 140, 308),
(25, 140, 327);

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
-- Indexes for table `group_messages`
--
ALTER TABLE `group_messages`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;

--
-- AUTO_INCREMENT for table `course_category`
--
ALTER TABLE `course_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `group_messages`
--
ALTER TABLE `group_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `subcourses`
--
ALTER TABLE `subcourses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=584;

--
-- AUTO_INCREMENT for table `token_blacklist`
--
ALTER TABLE `token_blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
