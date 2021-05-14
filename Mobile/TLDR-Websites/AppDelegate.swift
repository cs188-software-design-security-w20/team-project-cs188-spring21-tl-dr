//
//  AppDelegate.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 4/21/21.
//

import UIKit
import GoogleSignIn
@main
class AppDelegate: UIResponder, UIApplicationDelegate, GIDSignInDelegate {
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
        if let error = error {
           if (error as NSError).code == GIDSignInErrorCode.hasNoAuthInKeychain.rawValue {
             print("The user has not signed in before or they have since signed out.")
           } else {
             print("\(error.localizedDescription)")
           }
           return
         }
         // Perform any operations on signed in user here.
         let userId = user.userID                  // For client-side use only!
         let idToken = user.authentication.idToken // Safe to send to the server
         let fullName = user.profile.name
         let givenName = user.profile.givenName
         let familyName = user.profile.familyName
         let email = user.profile.email
        let picture = user.profile.imageURL(withDimension: 100)
         // ...
        
        let userTotal = User(fullName: user.profile.name,lastName: user.profile.givenName, email: user.profile.email, picture: user.profile.imageURL(withDimension: 100))
        
        let encoder = JSONEncoder()
        if let encoded = try? encoder.encode(userTotal) {
            let defaults = UserDefaults.standard
            defaults.set(encoded, forKey: "userData")
        }
        print(userId)
    }
    

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any]) -> Bool {
      return GIDSignIn.sharedInstance().handle(url)
    }
    
    func application(_ application: UIApplication,
                     open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
      return GIDSignIn.sharedInstance().handle(url)
    }

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        GIDSignIn.sharedInstance().clientID = "944387746626-1l85ju30dei3ju0pqad6u1c8mge09e1h.apps.googleusercontent.com"
        GIDSignIn.sharedInstance().delegate = self
        GIDSignIn.sharedInstance().restorePreviousSignIn()
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

