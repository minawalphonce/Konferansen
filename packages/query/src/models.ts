import { Timestamp } from 'firebase/firestore';

// User Types
export type UserRole = 'member' | 'admin';
export type UserGender = 'male' | 'female';
export type UserGrade = '10th' | '11th' | '12th';

export interface User {
    id: string;
    name: string;
    gender: UserGender;
    grade: UserGrade;
    phone: string;
    personalNumber?: string;
    groupId: string | null;
    roomId: string | null;
    totalScore: number;        // Combined score
    totalIndividualScore: number;  // Personal achievements
    totalTeamScore: number;    // Group contribution scores
    role: UserRole;
    fcmToken?: string;
    nfcTagId?: string;
    lastActive: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Group Types
export interface Group {
    id: string;
    name: string;
    color: string;
    totalScore: number;
    memberCount: number;
    memberIds: string[];  // Array of user IDs
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Activity Types
export type ActivityType = 'worship' | 'game' | 'service' | 'other';

export interface Activity {
    id: string;
    name: string;
    type: ActivityType;
    description: string;
    allowsScoring: boolean;
    maxScore: number;
    startTime: Timestamp;
    endTime: Timestamp;
    createdAt: Timestamp;
}

// Score Category Types
export interface ScoreCategory {
    id: string;
    name: string;
    description: string;
    weight: number;      // Multiplier for scores in this category
    isActive: boolean;
    createdAt: Timestamp;
}

// Score Types
export type ScoreType = 'individual' | 'group';

export interface Score {
    id: string;
    amount: number;
    type: ScoreType;
    recipientId: string;  // User or Group ID
    adminId: string;      // User ID of admin who gave the score
    reason: string;
    categoryId: string;   // Reference to ScoreCategory
    activityId: string;   // Reference to Activity
    createdAt: Timestamp;
}

// Room Types
export interface Room {
    id: string;
    name: string;
    capacity: number;
    gender: UserGender;
    occupants: string[];  // Array of user IDs
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Schedule Types
export type ScheduleDay = 'friday' | 'saturday' | 'sunday';

export interface ScheduleItem {
    id: string;
    day: ScheduleDay;
    startTime: Timestamp;
    endTime: Timestamp;
    title: string;
    description: string;
    location: string;
    activityId: string;   // Reference to Activity
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Notification Types
export type NotificationType = 'all' | 'individual' | 'group';
export type NotificationStatus = 'sent' | 'failed';

export interface Notification {
    id: string;
    title: string;
    body: string;
    type: NotificationType;
    recipients: string[];  // Array of user or group IDs
    adminId: string;      // User ID of admin who sent the notification
    status: NotificationStatus;
    sentAt: Timestamp;
}

// // Helper types for score queries
// export interface ScoreReport {
//     type: 'topMembers' | 'topGroups' | 'activityScores';
//     data: {
//         id: string;
//         name: string;
//         score: number;
//         category?: string;
//         activity?: string;
//     }[];
// }

// // Example score query functions
// export interface ScoreQueries {
//     getTopMembersByScore(limit: number): Promise<ScoreReport>;
//     getTopMembersByIndividualScore(limit: number): Promise<ScoreReport>;
//     getGroupScores(): Promise<ScoreReport>;
//     getTopMembersByActivity(activityId: string, limit: number): Promise<ScoreReport>;
//     getTopMembersByCategory(categoryId: string, limit: number): Promise<ScoreReport>;
// }