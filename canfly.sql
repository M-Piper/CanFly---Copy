/****** Object:  Database [CanFlyDB]    Script Date: 6/3/2024 1:18:55 PM ******/
CREATE DATABASE [CanFlyDB]  (EDITION = 'Standard', SERVICE_OBJECTIVE = 'S0', MAXSIZE = 250 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS, LEDGER = OFF;
GO
ALTER DATABASE [CanFlyDB] SET COMPATIBILITY_LEVEL = 150
GO
ALTER DATABASE [CanFlyDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CanFlyDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CanFlyDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CanFlyDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CanFlyDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [CanFlyDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CanFlyDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CanFlyDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CanFlyDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CanFlyDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CanFlyDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CanFlyDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CanFlyDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CanFlyDB] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [CanFlyDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CanFlyDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [CanFlyDB] SET  MULTI_USER 
GO
ALTER DATABASE [CanFlyDB] SET ENCRYPTION ON
GO
ALTER DATABASE [CanFlyDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [CanFlyDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/*** The scripts of database scoped configurations in Azure should be executed inside the target database connection. ***/
GO
-- ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 8;
GO
/****** Object:  Table [dbo].[aircraftType]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aircraftType](
	[aircraftTypeID] [int] IDENTITY(1,1) NOT NULL,
	[model] [varchar](max) NULL,
	[manufacturer] [varchar](100) NULL,
	[IATACode] [varchar](50) NULL,
	[ICAOCode] [varchar](50) NULL,
	[wingType] [varchar](50) NULL,
 CONSTRAINT [PK_planeTypeID] PRIMARY KEY CLUSTERED 
(
	[aircraftTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[document]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[document](
	[documentID] [int] IDENTITY(1,1) NOT NULL,
	[documentTypeID] [int] NOT NULL,
	[pilotID] [int] NOT NULL,
	[filePath] [nvarchar](1000) NOT NULL,
	[uploadDate] [datetime] NOT NULL,
	[uploadedBy] [nvarchar](255) NOT NULL,
	[fileSize] [int] NOT NULL,
	[fileHash] [nvarchar](512) NOT NULL,
 CONSTRAINT [PK_documentID] PRIMARY KEY CLUSTERED 
(
	[documentID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[documentType]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[documentType](
	[documentTypeID] [int] IDENTITY(1,1) NOT NULL,
	[documentTypeName] [nvarchar](255) NOT NULL,
	[description] [nvarchar](1000) NULL,
 CONSTRAINT [PK_documentTypeID] PRIMARY KEY CLUSTERED 
(
	[documentTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[knowledge]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[knowledge](
	[knowledgeID] [int] IDENTITY(1,1) NOT NULL,
	[pilotID] [int] NULL,
	[knowledgeTypeID] [int] NULL,
	[adminsteredBy] [nchar](300) NULL,
	[date] [date] NULL,
	[grade] [nchar](40) NULL,
	[groundSchoolHours] [int] NULL,
	[hoursComplete] [int] NULL,
 CONSTRAINT [PK_knowledgeID] PRIMARY KEY CLUSTERED 
(
	[knowledgeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[knowledgeType]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[knowledgeType](
	[knowledgeTypeID] [int] IDENTITY(1,1) NOT NULL,
	[longName] [nchar](400) NULL,
	[shortName] [nchar](100) NULL,
	[minimumPassMark] [int] NULL,
	[minimumHoursComplete] [int] NULL,
 CONSTRAINT [PK_knowledgeTypeID] PRIMARY KEY CLUSTERED 
(
	[knowledgeTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[logEntry]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[logEntry](
	[logEntryID] [int] IDENTITY(1,1) NOT NULL,
	[date] [date] NULL,
	[registration] [varchar](20) NULL,
	[pilotInCommand] [varchar](100) NULL,
	[studentOrCoPilot] [varchar](100) NULL,
	[activityExercises] [varchar](max) NULL,
	[singleEngineDayDualTime] [float] NULL,
	[singleEngineDayPICTime] [float] NULL,
	[singleEngineNightDualTime] [float] NULL,
	[singleEngineNightPICTime] [float] NULL,
	[multiEngineDayDualTime] [float] NULL,
	[multiEngineDayPICTime] [float] NULL,
	[multiEngineDaySICTime] [float] NULL,
	[multiEngineNightDualTime] [float] NULL,
	[multiEngineNightPICTime] [float] NULL,
	[multiEngineNightSICTime] [float] NULL,
	[instrumentIMC] [float] NULL,
	[instrumentHood] [float] NULL,
	[instrumentFTD] [float] NULL,
	[instrumentApproachesCount] [int] NULL,
	[crossCountryDayDualTime] [float] NULL,
	[crossCountryDayPICTime] [float] NULL,
	[crossCountryNightDualTime] [float] NULL,
	[crossCountryNightPICTime] [float] NULL,
	[routeFrom] [varchar](100) NULL,
	[routeVia] [varchar](100) NULL,
	[routeTo] [varchar](100) NULL,
	[dualInstructionGivenNotes] [varchar](max) NULL,
	[floatTimeNotes] [varchar](max) NULL,
	[VFRSimulatorNotes] [varchar](max) NULL,
	[pilotID] [int] NULL,
	[CAF] [bit] NULL,
	[takeOffs] [int] NULL,
	[landings] [int] NULL,
	[circuits] [int] NULL,
	[omitFromReports] [bit] NULL,
	[untetheredBalloon] [int] NULL,
	[altitudeBalloon] [int] NULL,
	[outsideCanada] [bit] NULL,
	[instrumentGroundOptional] [int] NULL,
	[launchLocationGlider] [varchar](500) NULL,
	[distanceGlider] [int] NULL,
	[launchTypeGlider] [varchar](50) NULL,
	[aircraftCategory] [varchar](50) NULL,
	[aircraftTypeID] [int] NULL,
 CONSTRAINT [PK_logEntryID] PRIMARY KEY CLUSTERED 
(
	[logEntryID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[medical]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[medical](
	[medicalID] [int] IDENTITY(1,1) NOT NULL,
	[medicalTypeID] [int] NOT NULL,
	[doctorName] [nchar](100) NULL,
	[category] [int] NULL,
	[pilotID] [int] NULL,
	[expiry] [date] NULL,
 CONSTRAINT [PK_medicalID] PRIMARY KEY CLUSTERED 
(
	[medicalID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[medicalType]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[medicalType](
	[medicalTypeID] [int] IDENTITY(1,1) NOT NULL,
	[letterOrCertificate] [nchar](50) NULL,
	[category] [int] NULL,
 CONSTRAINT [PK_medicalTypeID] PRIMARY KEY CLUSTERED 
(
	[medicalTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pilot]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pilot](
	[pilotID] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [varchar](50) NULL,
	[lastName] [varchar](50) NULL,
	[email] [varchar](max) NULL,
	[phone] [int] NULL,
	[streetAddress] [varchar](max) NULL,
	[city] [varchar](100) NULL,
	[province] [varchar](50) NULL,
	[canadianForcesActive] [int] NULL,
	[canadianForcesRetired] [int] NULL,
 CONSTRAINT [PK_pilotID] PRIMARY KEY CLUSTERED 
(
	[pilotID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rating]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rating](
	[ratingID] [int] IDENTITY(1,1) NOT NULL,
	[pilotID] [int] NOT NULL,
	[ratingTypeID] [int] NOT NULL,
	[isWorkingTowards] [bit] NULL,
	[totalHoursAcheived] [decimal](5, 5) NULL,
	[dateAwarded] [date] NULL,
 CONSTRAINT [PK_ratingID] PRIMARY KEY CLUSTERED 
(
	[ratingID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ratingKnowledgeJunction]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ratingKnowledgeJunction](
	[ratingKnowledgeJunctionID] [int] IDENTITY(1,1) NOT NULL,
	[ratingTypeID] [int] NULL,
	[knowledgeTypeID] [int] NULL,
 CONSTRAINT [PK_ratingKnolwedgeJunctionID] PRIMARY KEY CLUSTERED 
(
	[ratingKnowledgeJunctionID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ratingMedicalJunction]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ratingMedicalJunction](
	[ratingMedicalJunctionID] [int] IDENTITY(1,1) NOT NULL,
	[ratingTypeID] [int] NULL,
	[medicalTypeID] [int] NULL,
	[optionalGroup] [bit] NULL,
 CONSTRAINT [PK_ratingMedicalJunction] PRIMARY KEY CLUSTERED 
(
	[ratingMedicalJunctionID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ratingType]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ratingType](
	[ratingTypeID] [int] IDENTITY(1,1) NOT NULL,
	[longName] [nchar](100) NOT NULL,
	[shortName] [nchar](100) NOT NULL,
	[type] [nchar](50) NOT NULL,
	[category] [nchar](60) NULL,
 CONSTRAINT [PK_ratingTypeID] PRIMARY KEY CLUSTERED 
(
	[ratingTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[requirements]    Script Date: 6/3/2024 1:18:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[requirements](
	[requirementsID] [int] IDENTITY(1,1) NOT NULL,
	[ratingTypeID] [int] NULL,
	[dualSoloTotalCredit] [nvarchar](50) NULL,
	[thisEntryHoursRequired] [decimal](5, 2) NULL,
	[instrumentFlightRequired] [decimal](5, 2) NULL,
	[instrumentFlightOptional] [decimal](5, 2) NULL,
	[crossCountryRequired] [decimal](5, 2) NULL,
	[crossCountryOptional] [decimal](5, 2) NULL,
	[crossCountryStopsRequired] [int] NULL,
	[crossCountryDistanceRequired] [int] NULL,
	[simulatorOptional] [decimal](5, 2) NULL,
	[simulatorRequired] [decimal](5, 2) NULL,
	[documentTypeID] [int] NULL,
	[instrumentGroundOptional] [int] NULL,
	[instrumentGroundRequired] [int] NULL,
	[towedFlightOptional] [int] NULL,
	[creditCAF] [bit] NULL,
	[creditOtherCountry] [bit] NULL,
	[creditLicense] [bit] NULL,
	[untetheredBalloon] [int] NULL,
	[altitudeBalloon] [int] NULL,
	[recencyMonths] [int] NULL,
	[takeOffs] [int] NULL,
	[circuits] [int] NULL,
	[landings] [int] NULL,
	[hoursInGyroRequired] [int] NULL,
	[thisEntryHoursOptional] [int] NULL,
 CONSTRAINT [PK_requirementsID] PRIMARY KEY CLUSTERED 
(
	[requirementsID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[document] ADD  DEFAULT (getdate()) FOR [uploadDate]
GO
ALTER TABLE [dbo].[logEntry] ADD  DEFAULT ((0)) FOR [CAF]
GO
ALTER TABLE [dbo].[document]  WITH CHECK ADD  CONSTRAINT [FK_documentID_documentTypeID] FOREIGN KEY([documentTypeID])
REFERENCES [dbo].[documentType] ([documentTypeID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[document] CHECK CONSTRAINT [FK_documentID_documentTypeID]
GO
ALTER TABLE [dbo].[document]  WITH CHECK ADD  CONSTRAINT [FK_documentID_pilotID] FOREIGN KEY([pilotID])
REFERENCES [dbo].[pilot] ([pilotID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[document] CHECK CONSTRAINT [FK_documentID_pilotID]
GO
ALTER TABLE [dbo].[knowledge]  WITH CHECK ADD  CONSTRAINT [FK_knowledgeID_knowledgeTypeID] FOREIGN KEY([knowledgeTypeID])
REFERENCES [dbo].[knowledgeType] ([knowledgeTypeID])
GO
ALTER TABLE [dbo].[knowledge] CHECK CONSTRAINT [FK_knowledgeID_knowledgeTypeID]
GO
ALTER TABLE [dbo].[knowledge]  WITH CHECK ADD  CONSTRAINT [FK_knowledgeID_pilotID] FOREIGN KEY([pilotID])
REFERENCES [dbo].[pilot] ([pilotID])
GO
ALTER TABLE [dbo].[knowledge] CHECK CONSTRAINT [FK_knowledgeID_pilotID]
GO
ALTER TABLE [dbo].[logEntry]  WITH CHECK ADD  CONSTRAINT [FK_logEntryID_aircraftTypeID] FOREIGN KEY([aircraftTypeID])
REFERENCES [dbo].[aircraftType] ([aircraftTypeID])
GO
ALTER TABLE [dbo].[logEntry] CHECK CONSTRAINT [FK_logEntryID_aircraftTypeID]
GO
ALTER TABLE [dbo].[logEntry]  WITH CHECK ADD  CONSTRAINT [FK_logEntryID_pilotID] FOREIGN KEY([pilotID])
REFERENCES [dbo].[pilot] ([pilotID])
GO
ALTER TABLE [dbo].[logEntry] CHECK CONSTRAINT [FK_logEntryID_pilotID]
GO
ALTER TABLE [dbo].[medical]  WITH CHECK ADD  CONSTRAINT [FK_medicalID_medicalTypeID] FOREIGN KEY([medicalTypeID])
REFERENCES [dbo].[medicalType] ([medicalTypeID])
GO
ALTER TABLE [dbo].[medical] CHECK CONSTRAINT [FK_medicalID_medicalTypeID]
GO
ALTER TABLE [dbo].[medical]  WITH CHECK ADD  CONSTRAINT [FK_medicalID_pilotID] FOREIGN KEY([pilotID])
REFERENCES [dbo].[pilot] ([pilotID])
GO
ALTER TABLE [dbo].[medical] CHECK CONSTRAINT [FK_medicalID_pilotID]
GO
ALTER TABLE [dbo].[rating]  WITH CHECK ADD  CONSTRAINT [FK_ratingID_pilotID] FOREIGN KEY([pilotID])
REFERENCES [dbo].[pilot] ([pilotID])
GO
ALTER TABLE [dbo].[rating] CHECK CONSTRAINT [FK_ratingID_pilotID]
GO
ALTER TABLE [dbo].[rating]  WITH CHECK ADD  CONSTRAINT [FK_ratingID_ratingTypeID] FOREIGN KEY([ratingTypeID])
REFERENCES [dbo].[ratingType] ([ratingTypeID])
GO
ALTER TABLE [dbo].[rating] CHECK CONSTRAINT [FK_ratingID_ratingTypeID]
GO
ALTER TABLE [dbo].[ratingKnowledgeJunction]  WITH CHECK ADD  CONSTRAINT [FK_ratingKnowledgeJunctionID__knowledgeID] FOREIGN KEY([knowledgeTypeID])
REFERENCES [dbo].[knowledgeType] ([knowledgeTypeID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ratingKnowledgeJunction] CHECK CONSTRAINT [FK_ratingKnowledgeJunctionID__knowledgeID]
GO
ALTER TABLE [dbo].[ratingKnowledgeJunction]  WITH CHECK ADD  CONSTRAINT [FK_ratingKnowledgeJunctionID__ratingID] FOREIGN KEY([ratingTypeID])
REFERENCES [dbo].[ratingType] ([ratingTypeID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ratingKnowledgeJunction] CHECK CONSTRAINT [FK_ratingKnowledgeJunctionID__ratingID]
GO
ALTER TABLE [dbo].[ratingMedicalJunction]  WITH CHECK ADD  CONSTRAINT [FK_ratingMedicalJunctionID_medicalTypeID] FOREIGN KEY([medicalTypeID])
REFERENCES [dbo].[medicalType] ([medicalTypeID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ratingMedicalJunction] CHECK CONSTRAINT [FK_ratingMedicalJunctionID_medicalTypeID]
GO
ALTER TABLE [dbo].[ratingMedicalJunction]  WITH CHECK ADD  CONSTRAINT [FK_ratingMedicalJunctionID_ratingTypeID] FOREIGN KEY([ratingTypeID])
REFERENCES [dbo].[ratingType] ([ratingTypeID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ratingMedicalJunction] CHECK CONSTRAINT [FK_ratingMedicalJunctionID_ratingTypeID]
GO
ALTER TABLE [dbo].[requirements]  WITH CHECK ADD  CONSTRAINT [FK_requirementsID__documentTypeID] FOREIGN KEY([documentTypeID])
REFERENCES [dbo].[documentType] ([documentTypeID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[requirements] CHECK CONSTRAINT [FK_requirementsID__documentTypeID]
GO
ALTER TABLE [dbo].[requirements]  WITH CHECK ADD  CONSTRAINT [FK_requirementsID_ratingTypeID] FOREIGN KEY([ratingTypeID])
REFERENCES [dbo].[ratingType] ([ratingTypeID])
GO
ALTER TABLE [dbo].[requirements] CHECK CONSTRAINT [FK_requirementsID_ratingTypeID]
GO
ALTER DATABASE [CanFlyDB] SET  READ_WRITE 
GO
