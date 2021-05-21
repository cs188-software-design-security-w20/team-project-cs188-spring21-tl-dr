//
//  summarizedTable.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 5/13/21.
//

import UIKit
import Alamofire
import SCLAlertView
import NVActivityIndicatorView
class publicSummaries: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var animationsLoading: NVActivityIndicatorView!
    @IBOutlet weak var table: UITableView!
    var summaries: [WelcomeElement] = []
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return summaries.count
    }
  
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let url = URL(string: ((summaries[indexPath.row].user[0].image ?? "")!))
        
        let data = try? Data(contentsOf: url!)

        if let imageData = data {
            let finalImage = UIImage(data: imageData)
            
            SCLAlertView().showInfo((summaries[indexPath.row].summary.url ?? "") ?? "", subTitle: ((summaries[indexPath.row].summary.summarizedText ?? "") ?? ""), circleIconImage: finalImage)
        }
       
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = UITableViewCell()
        if(summaries.isEmpty){
            return cell
        }
        else
        {
            cell.textLabel?.text = (summaries[indexPath.row].summary.url ?? summaries[indexPath.row].summary.plaintext) ?? "No Name data available"
            cell.textLabel?.font = cell.textLabel?.font.withSize(15)
            cell.detailTextLabel?.text = (summaries[indexPath.row].summary.createdAt ?? "No Date Provided")
        }
        
        return  cell
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
    
        
        
    }
    override func viewDidAppear(_ animated: Bool) {
        print("There")
        animationsLoading.startAnimating()
        let decoder =  JSONDecoder()
        
        AF.request( "https://tldr-server.paramshah.net/feed",
                    method: .get).responseJSON { [self] response in
                    
                    debugPrint(response)
                    
                    do{
                        let sums = try decoder.decode(Welcome.self, from: response.data!)
                    
                        summaries = sums
                        summaries.reverse()
                        let defaults = UserDefaults.standard
                        defaults.setValue(summaries.count, forKey: "sumCount")
                        table.reloadData()
                        animationsLoading.isHidden = true
                        table.isHidden = false
                       }
                    catch let error {
                                        print(error)
                    }

                }
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
