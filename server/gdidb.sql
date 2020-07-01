-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2020 at 01:55 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gdidb`
--

-- --------------------------------------------------------

--
-- Table structure for table `academics`
--

CREATE TABLE `academics` (
  `academic_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `primary_school` varchar(100) NOT NULL,
  `primary_qua` varchar(50) NOT NULL,
  `primary_date` varchar(15) NOT NULL,
  `secondary` varchar(100) NOT NULL,
  `secondary_qua` varchar(50) NOT NULL,
  `secondary_date` varchar(15) NOT NULL,
  `tertiaryOne` varchar(100) NOT NULL,
  `tertiaryOne_qua` varchar(50) NOT NULL,
  `tertiaryOne_date` varchar(15) NOT NULL,
  `tertiaryTwo` varchar(100) NOT NULL,
  `tertiaryTwo_qua` varchar(50) NOT NULL,
  `tertiaryTwo_date` varchar(15) NOT NULL,
  `tertiaryThree` varchar(100) NOT NULL,
  `tertiaryThree_qua` varchar(50) NOT NULL,
  `tertiaryThree_date` varchar(15) NOT NULL,
  `discipline` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `academics`
--

INSERT INTO `academics` (`academic_id`, `member_id`, `primary_school`, `primary_qua`, `primary_date`, `secondary`, `secondary_qua`, `secondary_date`, `tertiaryOne`, `tertiaryOne_qua`, `tertiaryOne_date`, `tertiaryTwo`, `tertiaryTwo_qua`, `tertiaryTwo_date`, `tertiaryThree`, `tertiaryThree_qua`, `tertiaryThree_date`, `discipline`) VALUES
(1, 6, 'NKST Primary school Jootar', 'FLSC', '2020-06-27', 'NKST Primary school Jootar', 'SSCE', '2020-06-12', 'Fuw', 'Bsc', '2020-06-18', '', '', '0000-00-00', '', '', '0000-00-00', 'Computer Science'),
(2, 8, 'NKST Primary school Jootar', 'FLSC', '2020-06-10', 'NKST Primary school Jootar', 'SSCE', '2020-06-12', 'Fuw', 'Bsc', '2020-06-19', 'Fuw', 'Masters', '2020-06-11', '', '', '0000-00-00', 'Computer Science');

-- --------------------------------------------------------

--
-- Table structure for table `causes`
--

CREATE TABLE `causes` (
  `req_id` int(11) NOT NULL,
  `req_author` varchar(50) NOT NULL,
  `req_title` varchar(255) NOT NULL,
  `req_content` text NOT NULL,
  `req_bg` varchar(100) NOT NULL,
  `req_expired` tinyint(1) NOT NULL,
  `req_descript` varchar(100) NOT NULL,
  `req_date` date NOT NULL,
  `req_tags` varchar(100) NOT NULL,
  `req_slug` varchar(255) NOT NULL,
  `req_amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `causes`
--

INSERT INTO `causes` (`req_id`, `req_author`, `req_title`, `req_content`, `req_bg`, `req_expired`, `req_descript`, `req_date`, `req_tags`, `req_slug`, `req_amount`) VALUES
(1, 'GDI Admin', 'Help Donate', '<p>hello</p>', 'http://localhost:5000/request_images/1593012841450-localhost_3000__(nexus-5x)-(1).png', 0, 'Hello world', '2020-06-24', 'hi, donate', 'help-donate', 50000);

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `amount` int(15) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `paidFor` int(11) NOT NULL,
  `message` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `name`, `email`, `phone`, `amount`, `date`, `status`, `reference`, `paidFor`, `message`) VALUES
(1, 'KELVIN T PETER', 'torver.kelvin@gmail.com', '2147483647', 50000, '2020-05-07', 'success', '954960109', 1, 'Approved'),
(2, 'KELVIN T PETER', 'torver.kelvin@gmail.com', '8145324529', 100000, '2020-05-07', 'success', '519542959', 1, 'Approved'),
(3, 'KELVIN T PETER', 'torver.kelvin@gmail.com', '8145324529', 20000, '2020-05-07', 'success', '632153214', 1, 'Approved'),
(4, 'KELVIN T PETER', 'torver.kelvin@gmail.com', '8145324529', 30000, '2020-05-07', 'success', '245508702', 1, 'Approved'),
(5, 'KELVIN T PETER', 'torver.kelvin@gmail.com', '8145324529', 9000, '2020-05-07', 'success', '754937589', 1, 'Approved'),
(6, 'KELVIN T PETER', 'torver.kelvin@gmail.com', '8145324529', 40000, '2020-05-07', 'success', '620746961', 1, 'Approved'),
(7, 'KELVIN T PETER', 'torver.kelvin@gmail.com', '8145324529', 40000, '2020-05-07', 'success', '749084942', 1, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `event_content` text NOT NULL,
  `event_descript` varchar(255) NOT NULL,
  `event_tags` varchar(200) NOT NULL,
  `event_start_date` date NOT NULL,
  `event_date` date NOT NULL,
  `event_end_date` date NOT NULL,
  `event_author` varchar(50) NOT NULL,
  `event_expired` tinyint(1) NOT NULL,
  `event_slug` varchar(255) NOT NULL,
  `event_bg` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_title`, `event_content`, `event_descript`, `event_tags`, `event_start_date`, `event_date`, `event_end_date`, `event_author`, `event_expired`, `event_slug`, `event_bg`) VALUES
(1, 'The greatest event ever', '<p>hello world, this is my first event</p>', 'hello', 'gdi, helChildren', '2020-06-09', '2020-06-24', '2020-06-30', 'GDI Admin', 0, 'the-greatest-event-ever', 'http://localhost:5000/event_images/1593006012971-localhost_3000_home_crm(nexus-5x)-(6).png');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `experience_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `ngoOne` varchar(100) NOT NULL,
  `ngoOne_position` varchar(50) NOT NULL,
  `ngoOne_res` varchar(50) NOT NULL,
  `ngoOne_date` date NOT NULL,
  `ngoTwo` varchar(100) NOT NULL,
  `ngoTwo_position` varchar(20) NOT NULL,
  `ngoTwo_res` varchar(50) NOT NULL,
  `ngoTwo_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`experience_id`, `member_id`, `ngoOne`, `ngoOne_position`, `ngoOne_res`, `ngoOne_date`, `ngoTwo`, `ngoTwo_position`, `ngoTwo_res`, `ngoTwo_date`) VALUES
(1, 6, '', '', '', '0000-00-00', '', '', '', '0000-00-00'),
(2, 8, 'GDI', 'Technical Expert', 'In charge of IT', '2020-06-17', 'gdi', 'GDI', 'TECHNICAL EDITOR', '2020-06-17');

-- --------------------------------------------------------

--
-- Table structure for table `log_error`
--

CREATE TABLE `log_error` (
  `id` int(11) NOT NULL,
  `tableType` varchar(30) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(11) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `marital` varchar(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `state` varchar(15) NOT NULL,
  `lga` varchar(20) NOT NULL,
  `nationality` varchar(15) NOT NULL,
  `dob` varchar(15) NOT NULL,
  `father` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_added` date NOT NULL,
  `passport` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `surname`, `firstName`, `lastName`, `gender`, `marital`, `phone`, `email`, `address`, `state`, `lga`, `nationality`, `dob`, `father`, `status`, `date_added`, `passport`) VALUES
(6, 'PETER', 'KELVIN', 'Torver', 'male', 'single', '08145324529', 'torver.kelvin@gmail.com', 'torver.kelvin@gmail.com', 'Benue', 'Ado', 'Non-Nigerian', '2020-06-12', 'KELVIN T PETER', 1, '0000-00-00', 'http://localhost:5000/public/member_images/1593509071947-frontatech-logo1.jpg'),
(8, 'James', 'Common', 'JayWon', 'male', 'married', '08145324529', 'torver.kelvin@gmail.com', 'No. 7 item street', 'FCT - Abuja', 'Gwagwalada', 'Non-Nigerian', '2020-06-17', 'JAMES HIINAN', 1, '0000-00-00', 'http://localhost:5000/public/member_images/1593508562639-frontatech-logo-3.png');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `newsletter`
--

INSERT INTO `newsletter` (`id`, `email`, `status`) VALUES
(1, 'torver.kelvin@gmail.com', 0),
(2, 'kelvin@gmail.com', 1),
(3, 'Kelvin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_slug` varchar(255) NOT NULL,
  `post_content` longtext NOT NULL,
  `post_descript` tinytext NOT NULL,
  `post_author` varchar(50) NOT NULL,
  `post_date` date NOT NULL,
  `post_tags` varchar(150) NOT NULL,
  `post_bg` varchar(100) NOT NULL,
  `post_cat` varchar(20) NOT NULL,
  `post_type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_title`, `post_slug`, `post_content`, `post_descript`, `post_author`, `post_date`, `post_tags`, `post_bg`, `post_cat`, `post_type`) VALUES
(1, 'hello', 'hello', '<p>hello</p>', 'hi everyone', 'GDI', '2020-06-24', 'hi,everyone', 'http://localhost:5000/post_images/1592990058635-8by6.jpg', 'General', 'General'),
(2, 'this is the greatest blog ever', 'this-is-the-greatest-blog-ever', '<p>Hello peeps</p>', 'Hello world', 'GDI', '2020-06-24', 'HTML, CSS, Javascript, Boostrap', 'http://localhost:5000/post_images/1592993214106-background.jpg', 'General', 'General'),
(3, 'this is the greatest blog ever', 'this-is-the-greatest-blog-ever', '<p>hello</p>', 'hello', 'GDI', '2020-06-24', 'HTML, CSS, Javascript, Boostrap', 'http://localhost:5000/post_images/1593001853285-localhost_3000_home_crm(nexus-5x)-(8).png', 'General', 'General');

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `comment_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(10) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_comments`
--

INSERT INTO `post_comments` (`comment_id`, `name`, `email`, `comment`, `date`, `post_id`) VALUES
(1, 'peter kelvin torver', 'torver.kel', 'hello world', '2020-04-19', 12),
(2, 'John Doe', 'john@gmail', 'hello world, i\'m John', '2020-04-19', 12),
(3, 'Janet Doe', 'janet@gmai', 'hello world i\'m janet doe', '2020-04-19', 12),
(4, 'Jon Green', 'Jon@gmail.', 'hello i jon champion', '2020-04-19', 13),
(5, 'Jame Common', 'james@gmai', 'hello guys', '2020-04-19', 13),
(6, 'Jopo Lomo', 'jopo@gmail', 'hello', '2020-04-19', 13),
(7, 'Gomma Winks', 'Gomman@gma', 'hello', '2020-04-19', 13),
(8, 'Monna Yen', 'June@gmail', 'hello wonna', '2020-04-19', 13),
(9, 'hello Man', 'jon@gmail.', 'hello am here', '2020-04-19', 13),
(10, 'Don Tester', 'test@gmail', 'hello world i am testing this function hello world i am testing this function \n', '2020-04-19', 12),
(11, 'Dina Warey', 'Dina@gmail', 'hello world i am testing this function \nhello world i am testing this function \nhello world i am testing this function \n\n', '2020-04-19', 12),
(12, 'Gonna Wen', 'wen@gmail.', 'hello world i am testing this function \nhello world i am testing this function \nhello world i am testing this function \n\n', '2020-04-19', 12),
(13, 'Jamina WoryMan', 'jamina@gma', 'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\nconsequat. Duis aute irure dolor ', '2020-04-19', 12),
(14, 'Pizza Goman', 'pizza@gmai', 'hello world i\'m pizza', '2020-04-19', 13),
(15, 'Junner', 'junner@gma', 'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ads essential\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ads essential\n', '2020-04-19', 13),
(16, 'Peter Kelvin Torver', 'torver@gma', 'hello world this is me', '2020-04-20', 3),
(17, 'Young Kelvin', 'Young@gmai', 'Hello everybody, here I am', '2020-04-20', 3),
(18, 'peter', 'torver.kel', 'hello world', '2020-04-21', 12),
(19, 'peter kelvin', 'torver@gma', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Here you can use rows and columns here to organize your ', '2020-04-22', 11),
(20, 'peter', 'james', 'hello', '2020-04-22', 11),
(21, 'Parker', 'parker@gma', 'hello this is example of a sponsored post\nhello this is example of a sponsored post\n', '2020-04-22', 13),
(22, 'Justine', 'John@gmail', 'Here you can use rows and columns here to organize your footer content.\n\n', '2020-04-22', 13),
(23, 'halloween', 'halloween@', 'hi', '2020-04-22', 8),
(24, 'peter', 'torver.kel', 'hello world i\'m peter kelvin da torver', '2020-04-22', 11),
(25, 'Peter James', 'Torver', 'hello this kelvin', '2020-05-06', 12),
(26, 'Carren Wallace', 'torver.kel', 'hello this is my first comment', '2020-05-06', 13),
(27, 'Loftus Baba', 'torver@gma', 'Hello world', '2020-05-06', 12),
(28, 'Peter Joker', 'jOKER@GMAI', 'HELLO', '2020-05-07', 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` varchar(15) NOT NULL,
  `photo_url` varchar(100) DEFAULT NULL,
  `linkedin` varchar(100) DEFAULT NULL,
  `fb_link` varchar(100) DEFAULT NULL,
  `twitter_link` varchar(100) DEFAULT NULL,
  `instalink` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `password`, `status`, `photo_url`, `linkedin`, `fb_link`, `twitter_link`, `instalink`) VALUES
(1, '', 'Beyond', '', '12345678', 'super', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academics`
--
ALTER TABLE `academics`
  ADD PRIMARY KEY (`academic_id`);

--
-- Indexes for table `causes`
--
ALTER TABLE `causes`
  ADD PRIMARY KEY (`req_id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`experience_id`);

--
-- Indexes for table `log_error`
--
ALTER TABLE `log_error`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academics`
--
ALTER TABLE `academics`
  MODIFY `academic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `causes`
--
ALTER TABLE `causes`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `log_error`
--
ALTER TABLE `log_error`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
