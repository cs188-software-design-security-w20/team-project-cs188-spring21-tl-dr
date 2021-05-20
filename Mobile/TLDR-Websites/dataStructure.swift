//
//  dataStructure.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 5/13/21.
//

import Foundation
struct Summary: Codable {
    var createdAt: String??
    var id: String??
    var plaintext: String??
    var isPublic: Bool??
    var summarizedText: String??
    var updatedAt: String??
    var url: String??
    var userId: String??
}
struct summaryGroup:Codable{
    var summaries: [Summary]
}

struct User: Codable{
    var fullName: String
    var lastName: String
    var email: String
    var picture: URL
}
struct UserSums: Codable{
    var id: String??
    var firstname: String??
    var lastName: String??
    var email: String??
    var image: String??
    var createdAt: String??
    var updatedAt: String??
}
struct userGroup: Codable{
    var user: UserSums
    var summary: Summary
}

struct WelcomeElement: Codable {
    let summary: Summary
    let user: [UserSums]
}

typealias Welcome = [WelcomeElement]

