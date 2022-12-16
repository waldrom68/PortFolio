
package com.portfolio.SpringBoot.model;


public class PortfolioSetting {
    private long id;
    private String theme = "dark";
    private boolean status = true;
    private long User_id;

    public PortfolioSetting() {
    }

    public PortfolioSetting(long id, String theme, boolean status, long User_id) {
        this.id = id;
        this.theme = theme;
        this.status = status;
        this.User_id = User_id;
    }
    
    
}

