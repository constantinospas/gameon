import { Component, Input, OnInit } from '@angular/core'
import { ApiService, BET, Match, Odd, Team } from '../../api.service'

@Component({
  selector: 'go-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() public odd: Odd

  public bet = BET
  public match: Match
  public homeTeam: Team
  public awayTeam: Team

  constructor (private apiService: ApiService) { }

  ngOnInit () {
    this.apiService
      .match(this.odd.matchId)
      .subscribe(match => {
        this.match = match

        this.apiService
          .team(this.match.homeTeamId)
          .subscribe(team => this.homeTeam = team)

        this.apiService
          .team(this.match.awayTeamId)
          .subscribe(team => this.awayTeam = team)

        // this.apiService
        //   .user()
        //   .subscribe(user => {
        //     console.log('kotsios', user)
        //   })
      })
  }

  public toggle (bet: BET) {
    this.apiService.toggle(this.odd.matchId, bet)
  }
}
