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
class summarizedTable: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var animationsLoading: NVActivityIndicatorView!
    @IBOutlet weak var table: UITableView!
    var summaries: [Summary] = []
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return summaries.count
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        SCLAlertView().showInfo((summaries[indexPath.row].url ?? "") ?? "", subTitle: ((summaries[indexPath.row].summarizedText ?? "") ?? ""))
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = UITableViewCell()
        if(summaries.isEmpty){
            return cell
        }
        else
        {
            cell.textLabel?.text = (summaries[indexPath.row].url ?? summaries[indexPath.row].plaintext) ?? "No Name data available"
            cell.textLabel?.font = cell.textLabel?.font.withSize(15)
            cell.detailTextLabel?.text = (summaries[indexPath.row].createdAt ?? "No Date Provided")
        }
        
        return  cell
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
    
        
        
    }
    override func viewDidAppear(_ animated: Bool) {
        print("here")
        animationsLoading.startAnimating()
        let decoder =  JSONDecoder()
        
        AF.request( "http://tldr-server.us-east-2.elasticbeanstalk.com/user/summaries",
                    method: .get).responseJSON { [self] response in
                    
                    debugPrint(response)
                    
                    do{
                        let sums = try decoder.decode(summaryGroup.self, from: response.data!)
                    
                        summaries = sums.summaries
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
