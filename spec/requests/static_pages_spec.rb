require 'spec_helper'

describe "StaticPages" do
  describe "Home GET home_path" do   
    it "should have the title 'Home'" do
      visit home_path
      page.should have_selector("title", :text => 'Home')
    end
    
    it "should have the content 'Home'" do
      visit home_path
      page.should have_selector('h1', :text => "Welcome to TimeStamp")
    end
  end
  
  describe "About GET about_path" do
    it "should have the title 'About'" do
      visit about_path
      page.should have_selector("title", :text => 'About')
    end
    
    it "should have the content 'About'" do
      visit about_path
      page.should have_selector("h1", :text => 'About')
    end
  end

  describe "Help GET help_path" do
    it "should have the title 'Help'" do
      visit help_path
      page.should have_selector("title", :text => 'Help')
    end
    
    it "should have the content 'Help'" do
      visit help_path
      page.should have_selector('h1', :text => 'Help')
    end
  end
  
  describe "Contact GET help_path" do
    it "should have the title 'Contact'" do
      visit contact_path
      page.should have_selector("title", :text => 'Contact')
    end
    
    it "should have the content 'Contact'" do
      visit contact_path
      page.should have_selector('h1', :text => 'Contact')
    end
  end
end
