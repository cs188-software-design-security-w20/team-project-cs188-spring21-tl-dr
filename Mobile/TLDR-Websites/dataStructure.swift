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
